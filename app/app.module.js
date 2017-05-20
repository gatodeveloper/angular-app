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
