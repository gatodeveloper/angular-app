/*
 * angular-app - Angular App
 * @version v1.0.0
 * @link https://github.com/gatodeveloper/angular-app#readme
 * @license MIT
 */
(function () {
  'use strict';

  angular.module('catMap.map', []);
  angular.module('catMap.map')

})();

(function(){
  'use strict';

angular.module('catMap.map')
  .config( config )

  config.$inject = ['$stateProvider', '$urlRouterProvider'];


  function config($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('map', {
        url: "/",
        //template: '<div ui-view=""></div>',
        views: {
          content: {
            //templateUrl:'partials/main.html',
            templateUrl: "partials/map.index.html",
            controller: 'MapCtrl'
          },
          header: {
            templateUrl:'partials/shared.header.html',
          },
          footer: {
            templateUrl:'partials/shared.footer.html',
          }
        }
      });

  };

})();

(function(){
    'use strict';

    angular.module('catMap', [
    'ui.router',
    'ngSanitize',
    'ngMap',
    'catMap.map',
    ]);
    
    angular.module('catMap');

    angular.module('catMap').run(['$rootScope', '$state', 'appConfig', function ($rootScope, $state, appConfig) {
      $rootScope.appConfig = appConfig;
    }]);

})();

(function(){
  'use strict';

  angular.module('catMap')
    .constant("appConfig", {
      url: 'http://localhost',
      port: '4001',
      googleMaps: {
        key: "AIzaSyA8IIr_mIQ65H_5CQqCSjwyo_tLST36Yog",
        apis: "https://maps.googleapis.com/maps/api/",
        geocodeUrl: "https://maps.googleapis.com/maps/api/geocode/json",
        apiUrl: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA8IIr_mIQ65H_5CQqCSjwyo_tLST36Yog"
      }

    });

})();

(function(){
  'use strict';

  angular
    .module('catMap')
    .config( function ($stateProvider, $urlRouterProvider, $locationProvider){

      $urlRouterProvider
        .otherwise("/");

      $stateProvider
        
        .state('main', {
          url: '/home',
          views: {
            content: {
              templateUrl:'partials/main.html',
            },
            header: {
              templateUrl:'partials/shared.header.html',
            },
            footer: {
              templateUrl:'partials/shared.footer.html',
            }
          }
        });

      $locationProvider.html5Mode(true);

    })

})();

(function(){
  'use strict';

  angular.module('catMap.map')
    .controller('MapCtrl', MapCtrl);

  MapCtrl.$inject = ['$scope', '$rootScope', 'NgMap', 'MapFactory', 'MapServices'];

  function MapCtrl($scope, $rootScope, NgMap, MapFactory, MapServices){

    var VM = $scope;

    VM.origin, VM.destination = null;
    VM.initWayPoints = [];
    VM.wayPoints = [];

    VM.onClickMap = function(e){

      var event = e.latLng;
      var lat = event.lat();
      var lng = event.lng();
      VM.clickPoint = lat+','+lng;
      VM.currentPosition = VM.clickPoint;
      VM.pointsData = MapServices.sortLocations(VM.initPoints, lat, lng);
      VM.wayPoints = VM.pointsData.map(function(pointData){
        return {
          location: {
            lat: pointData.geometry.location.lat,
            lng: pointData.geometry.location.lng
          },
          stopover: true
        };
      });
      VM.origin = lat+','+lng;
      VM.destination = VM.wayPoints[4].location.lat+','+VM.wayPoints[4].location.lng;
      VM.newRute = true;
      VM.clickedMap = true;
    }
    
    VM.drawnRute = function(point){
      var position = this.position;
      var lat = position.lat();
      var lng = position.lng();

      if(!VM.origin){
        VM.origin = lat+','+lng;
      }else{
        VM.destination = lat+','+lng;
      }

      VM.newRute = true;
    }

    function printPoints(results){
      debugger;
      var points = [],
          initWayPoints = [],
          initPoints = [],
          results = results || [];

      results.forEach(function(obj, i){
        var pointData = obj.data.results[0];
        var geometry = pointData.geometry || {};
        var coordinates = geometry.location;
        var wayPoint = {
          location: {
            lat: coordinates.lat,
            lng: coordinates.lng
          },
          stopover: true
        };

        var point = {
          pos: [coordinates.lat, coordinates.lng],
          name: i
        };

        points.push(point);
        initPoints.push(pointData);
        initWayPoints.push(wayPoint);
      });


      VM.initPoints = initPoints;
      VM.initWayPoints = initWayPoints;
      VM.points = points;
    }

    function onLoadAddresses(result){
      var data = result.data || {};
      var address = data.address || [];
      
      MapFactory.getGeoInfoByAddresses(address)
        .then(printPoints)
        .catch(onErr);
    }

    (function init(){
      MapFactory.getAddresses()
        .then(onLoadAddresses)
        .catch(onErr);
    })();

    function onErr(err){
      debugger;
    }

    google.maps.event.addDomListener(window, 'load');

  }

})();

(function() {

  'use strict';

  angular.module('catMap.map')
    .factory('MapFactory', MapFactory);

    MapFactory.$inject = ['$http', '$q', 'appConfig'];

    function MapFactory($http, $q, appConfig){
      var googleConfig = appConfig.googleMaps;
      return {
        getAddresses: function(){
          return $http.get('./data/address.json');
        },
        getGoogleAddress: function(address){
          address = address.replace(/#/ig, 'No');
          return $http.get(googleConfig.geocodeUrl+'?address='+address+'&components=country:co&components=locality:bogota&key='+googleConfig.key);
        },
        getGeoInfoByAddresses: function(addresses){
          var self = this,
              promises = [],
              addresses = addresses || [];

          addresses.forEach(function(address){  
            promises.push(self.getGoogleAddress(address));
          });

          return $q.all(promises);
        }
      }
    }

})();
(function() {

  'use strict';

  angular.module('catMap.map')
    .factory('MapServices', MapServices);

    MapServices.$inject = [];

    function MapServices(){
      return {
        sortLocations: function(locations, lat, lng) {
          function dist(l) {
            l = l.geometry.location;
            var op = (l.lat - lat) * (l.lat - lat) + (l.lng - lng) * (l.lng - lng);
            return op;
          }

          locations.sort(function(l1, l2) {
            var distances = dist(l1) - dist(l2);
            return distances;
          });

          return locations;
        }
      }
    }

})();