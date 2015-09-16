// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('css', ['ionic', 'css.controllers'])

.constant('HostOAuthUrl', ionic.Platform.isWebView() ?
    'http://unit0424.oracleads.com:7201' : 'http://unit0424.oracleads.com:7201')
  .constant('HostMcsUrl', ionic.Platform.isWebView() ?
    'http://unit0424.oracleads.com:7201' : 'http://unit0424.oracleads.com:7201')
  .constant('MCSBackendID', '367aa237-ee0b-48b3-a250-d5efb39a9149')

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);

})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginController'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/employees.html',
        controller: 'HomeCtrl'
      }
    }
  })


  .state('app.jobs', {
    url: '/myworkorders/detail',
    views: {
      'menuContent': {
        templateUrl: 'templates/job/menu.html'
      }
    }
  })


  .state('app.jobs.triage', {
    url: '/triage/:PersonId',
    resolve: {
      employeeDetail: function($stateParams, WOService) {
        return WOService.getWorkOrderById(
          $stateParams.PersonId)
      },
	  expenseReport:function($stateParams, WOService) {
        return WOService.getExpenseReportById()
      } 
    },
    views: {
      'shopjobsContent': {
        templateUrl: 'templates/employeeDetails.html',
        controller: 'WorkOrderDetailsCtrl'
      }
    }
  })



;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
  $httpProvider.interceptors.push('MCSInterceptor');
});
