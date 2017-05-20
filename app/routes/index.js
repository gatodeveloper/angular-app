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
