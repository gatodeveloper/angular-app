(function() {

  'use strict';

  angular.module('catMap.map')
    .factory('MapFactory', MapFactory);

    MapFactory.$inject = ['$http', '$q'];

    function MapFactory($http, $q){
      return {
        getAddresses: function(){
          return $http.get('./data/address.json');
        },
        getGoogleAddress: function(address){
          address = address.replace(/#/ig, 'No');
          return $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyA8IIr_mIQ65H_5CQqCSjwyo_tLST36Yog&components=country:co&components=locality:bogota');
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