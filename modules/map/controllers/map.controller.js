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
