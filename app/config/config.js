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
