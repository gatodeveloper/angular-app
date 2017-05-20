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