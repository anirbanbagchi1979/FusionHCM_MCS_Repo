angular.module('css.controllers')

.factory('MCSInterceptor', ['$q', '$window', '$location', '$rootScope',
  'localstorage',
  function($q, $window, $location, $rootScope, localstorage) {
    return {
      request: function(config) {
        if (!config.headers.Authorization) {
          if (  localstorage.get('authToken')) {
            config.headers.Authorization = localstorage.get('authToken');
          } else {
            // this prevents the login basic authentication screen from browsers like Safari
            config.headers.Authorization = 'BasicCustom';
          }
        }

        return config || $q.when(config);
      },
      response: function(response) {
        /*if (response.message) { alert(response.message); }*/
        return response || $q.when(response);
      },

      responseError: function(response) {

        // TRY to invalidate all $scope variable if required

        // 401- Unauthorized
        if (response.status == 401) {
          $rootScope.$broadcast('event:auth-loginRequired');
          $rootScope.$broadcast('event:auth-login-failed', 401);
        }

        // user does not have access
        if (response.status == 403) {
          $rootScope.$broadcast('event:auth-loginRequired');
          $rootScope.$broadcast('event:auth-login-failed', 403);
        }

        // L.Pelov
        // even we intercept, we want to make sure that this continues to the original code
        return $q.reject(response);
      }

      // END
    };
  }
]);
