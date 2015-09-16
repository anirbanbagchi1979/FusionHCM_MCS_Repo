angular.module('css.controllers')

.factory('UserAuthService', ['$window', '$location', '$http', '$rootScope',
  'HostOAuthUrl', '$ionicHistory', '$state', 'localstorage',
  function($window, $location, $http, $rootScope, HostOAuthUrl,
    $ionicHistory, $state, localstorage) {
    return {
      login: function(username, password) {

        //var loginUrl = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/internals/login';
        //var loginUrl = 'http://unit23586.oracleads.com:7778/ms_oauth/oauth2/endpoints/oauthservice/tokens';

        // COMMENT OUT THE TWO LINES BELOW if you want to test authentication against MCS (Very SLOW right now)..
        //var self = this;
        //return self.login_dummy(username,password);

        // this should be somewhere globbaly
        var loginUrl = HostOAuthUrl + '/mobile/custom/getemployeesHCM/employees';
        var authHeader = 'Basic ' + btoa(username + ':' + password);
        var req = {
          method: 'GET',
          url: loginUrl,

          /* we should look automate this process here as well */
          headers: {
            'Content-Type': 'application/json',
            'Oracle-Mobile-Backend-Id': '367aa237-ee0b-48b3-a250-d5efb39a9149',
            'Authorization':  authHeader
          }
          // data: 'grant_type=password&username=' + username + '&password=' + password
          //data: 'grant_type=password&username=lynn&password=123456'
        };
        console.log(req);

        $http(req)
          .success(function(data) {
            //console.log(data);
            // if all good go to the latest page where you was, in our case remove the login

            localstorage.set('logged_in_user', username);
            localstorage.set('authToken', authHeader);
            localstorage.setObject('workOrders', data);
            $rootScope.$broadcast('event:auth-loginConfirmed');

            // find way to reset the controler
            //$state.go($state.current, {}, {reload: true});
            $state.transitionTo('app.home', {}, {
              location: true,
              inherit: true,
              relative: $state.$current,
              notify: true
            });

          })
          .error(function(keyValue) {
            console.log(keyValue);
            // DO NOT PUT ANYTHING HERE INSIDE, IT WILL BE HANDLED BY THE INTERCEPTOR
          });

        //return $http(req);
      },

      login_dummy: function(username, password) {
		//alert("Dummy")
        //console.log(data);
        // if all good go to the latest page where you was, in our case remove the login

        localstorage.set('logged_in_user', username);
        $rootScope.$broadcast('event:auth-loginConfirmed');

        // find way to reset the controler
        //$state.go($state.current, {}, {reload: true});
        $state.transitionTo('app.home', {}, {
          location: true,
          inherit: true,
          relative: $state.$current,
          notify: true
        });

      },

      logout: function() {
        if ($window.localStorage.getItem('logged_in_user')) {
          localstorage.remove('logged_in_user');
          $rootScope.$broadcast('event:auth-loginRequired');

          // clear history, BUT this DOES NOT reset the CONTROLLERS
          $ionicHistory.clearHistory();
          $ionicHistory.clearCache();
        }
      },
      isLoggedIn: function() {
        console.log('Checking if user is logged in');
        if ($window.localStorage.getItem('logged_in_user')) {
          console.log('token exists in local storage');
          return true;
        } else {
          console.log('token not found. user nt logged in');
          return false;
        }
      },
      getLoggedInUserProfile: function() {
        console.log('Checking if user is a service Writer');
        if ($window.localStorage.getItem('logged_in_user')) {
          console.log('token exists in local storage');
          var profile = {};
          var username = $window.localStorage.getItem('logged_in_user');
          if (username == 'helenMills') {
            profile.username = username;
            profile.name = 'Helen Mills';
            profile.role = 'service_writer';
          } else if (username == 'casey') {
            profile.username = username;
            profile.name = 'Casey Brown';
            profile.role = 'technician';
          } else if (username == 'angie') {
            profile.username = username;
            profile.name = 'Angie McGaha';
            profile.role = 'service_writer';
          }
          return profile;
        } else {
          console.log('token not found. user not logged in');
          return null;
        }
      },
      isTechnician: function() {
        var profile = this.getLoggedInUserProfile();

        if (profile.role == 'technician') {
          return true;
        } else {
          return false;
        }
      },
      isServiceWriter: function() {
        var profile = this.getLoggedInUserProfile();

        if (profile.role == 'service_writer') {
          return true;
        } else {
          return false;
        }
      }


    };
  }
]);
