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