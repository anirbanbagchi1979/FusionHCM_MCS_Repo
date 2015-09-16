
// THIS SHOULD BE REBUILD!, CURRENTLY DOES NOT WORK!
angular.module('css.controllers')

.factory('localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('UserAuthFactory',['$window', '$location', '$http', '$rootScope', 'HostOAuthUrl', '$ionicHistory', '$state', function ($window, $location, $http, $rootScope, HostOAuthUrl, $ionicHistory, $state) {
    return {
        login: function (username, password) {
            //var loginUrl = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/internals/login';
            //var loginUrl = 'http://unit23586.oracleads.com:7778/ms_oauth/oauth2/endpoints/oauthservice/tokens';

            // this should be somewhere globbaly
            var loginUrl = HostOAuthUrl + '/ms_oauth/oauth2/endpoints/oauthservice/tokens';
            console.log("LOGIN user: " + username + " - PW: " + password);

			var req = {
				 method: 'POST',
				 url: loginUrl,
                 /* we should look automate this process here as well */
				 headers: {
				   'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
				   'Authorization': 'Basic TWFudWZhY3R1cmluZy8xLjAvMDY5YTNhYTBmOWU2Y2Q2OWZlYzRmODU4NjAzNjdkZDI6ZTRlNGJhMTYtNGE2ZS00YWY1LThlMjItMzRjOGEzMzRjNTU3'
				 },
         data: 'grant_type=password&username='+username+'&password='+password
				 //data: 'grant_type=password&username=lynn&password=123456'
			}
      console.log(req);

			$http(req)
            .success(function(data) {
                //console.log(data);
                // if all good go to the latest page where you was, in our case remove the login
                var keyValue = '';

                if (data.token_type && data.access_token) {
                    keyValue = data.token_type + " " + data.access_token;

                    // store in the local storage
                    $window.localStorage.setItem('key', keyValue);
                    $window.localStorage.setItem('logged_in_user', username);
                }

                $rootScope.$broadcast('event:auth-loginConfirmed');

                // find way to reset the controler
                //$state.go($state.current, {}, {reload: true});
                $state.transitionTo('app.sales', {}, {location: true, inherit: true, relative: $state.$current, notify: true});




            })
            .error(function(keyValue) {
                console.log(keyValue);
                // DO NOT PUT ANYTHING HERE INSIDE, IT WILL BE HANDLED BY THE INTERCEPTOR
            });

			//return $http(req);

        },
        logout: function () {
            if ($window.localStorage.getItem('key')) {

                $window.localStorage.removeItem('key');
                $window.localStorage.removeItem('logged_in_user');
                $rootScope.$broadcast('event:auth-loginRequired');

                // clear history, BUT this DOES NOT reset the CONTROLLERS
                $ionicHistory.clearHistory();
                $ionicHistory.clearCache();
            }
        },
        isLoggedIn: function(){
          console.log('Checking if user is logged in');
          if ($window.localStorage.getItem('key')) {
            console.log('token exists in local storage');
            return true;
          }else{
            console.log('token not found. user nt logged in');
            return false;
          }
        }
    }
}])

// set the authentiaction header for each request!!!
// also check if the request sended requires security, if it's the case, redirect
// storeApp.$inject = ['$q', '$window', '$location', '$routeParams'];
.factory('TokenInterceptor', ['$q', '$window', '$location', '$rootScope', function ($q, $window, $location, $rootScope) {
    return {
        request: function (config) {

            if ($window.localStorage.getItem('key')) {
                config.headers.authorization = $window.localStorage.getItem('key');
            }
            else {
                // this prevents the login basic authentication screen from browsers like Safari
                config.headers.authorization = 'BasicCustom';
            }

            return config || $q.when(config);
        },
        response: function (response) {
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
}]);
