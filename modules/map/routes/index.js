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
