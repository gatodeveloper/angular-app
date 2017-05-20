(function(){
  'use strict';

  angular.module('catMap')
    .constant("appConfig", {
      url: 'http://localhost',
      port: '4001',
      googleMaps: {
        key: "AIzaSyA4-LkXroaG8cjUszwUORc1fbwWPDPGBZo",
        apis: "https://maps.googleapis.com/maps/api/",
        geocodeUrl: "https://maps.googleapis.com/maps/api/geocode/json",
        apiUrl: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA4-LkXroaG8cjUszwUORc1fbwWPDPGBZo"
      }

    });

})();
