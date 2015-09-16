angular.module('css.controllers')

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state,
  UserAuthService, WOService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.logout = function() {
    UserAuthService.logout();

  };

  $scope.$on('event:auth-loginRequired', function(e, rejection) {
    $state.go('login');
  });

  $ionicModal.fromTemplateUrl('templates/search.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(searchModal) {
    $scope.searchModal = searchModal;
  });
  $scope.openSearch = function(weather) {
    $scope.searchModal.show();
  };
  $scope.closeSearch = function() {
    $scope.searchModal.hide();
  };
  //Cleanup the searchModal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.searchModal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
  $scope.searchValue = '';
  $scope.searchData = {};
  $scope.getMockData = function() {
    if ($scope.isServiceWriter()) {
      WOService.getWorkOrders().success(function(data) {
        console.log(data);
        $scope.searchData = data;
      });

    } else if ($scope.isTechnician()) {
      WOService.getWorkOrdersFiltered().success(function(data) {
        console.log(data);
        $scope.searchData = data;
      });
    }

  };

  $scope.getAssignedPic = function(username) {

    if (username == 'Betty Dunn') {
      return 'img/p1.png';
    } else if (username == 'Debra Gardner') {
      return 'img/p4.png';
    } else if (username == 'Jeremy Robinson') {
      return 'img/p2.png';
    } else if (username == 'Anthony Oliver') {
      return 'img/p5.png';
    } else if (username == 'Anna Daniels') {
      return 'img/p3.png';
    }

  };
  $scope.getJobTypeIcon = function(jobtype) {
    if (jobtype == 'Repair') {
      return 'img/repair.png';
    } else if (jobtype == 'Maintenance') {
      return 'img/mainte.png';
    }
  };

  $scope.getStatusClass = function(status) {
    if (status == 'Not Assigned' || status == 'Claim Denied') {
      return 'job-status-class';
    }
  };

  $scope.getProfilePic = function() {
    if (!$scope.profile) {
      $scope.profile = UserAuthService.getLoggedInUserProfile();
    }
    if ($scope.profile.username == 'helenMiller') {
      return 'img/p1.png';
    } else if ($scope.profile.username == 'joe') {
      return 'img/p2.png';
    } else {
      return 'img/p3.png';
    }
  };

  $scope.isServiceWriter = function() {
    if (!$scope.profile) {
      $scope.profile = UserAuthService.getLoggedInUserProfile();
    }
    if ($scope.profile.role == 'service_writer') {
      return true;
    } else {
      return false;
    }
  };

  $scope.isTechnician = function() {
    if (!$scope.profile) {
      $scope.profile = UserAuthService.getLoggedInUserProfile();
    }
    if ($scope.profile.role == 'technician') {
      return true;
    } else {
      return false;
    }
  };

  $scope.getJobsScreenTitle = function() {
    if ($scope.profile.role == 'technician') {
      return 'My Work Orders';
    } else {
      return 'Shop\'s Jobs';
    }
  };
  $scope.getAssignedPic = function(username) {

    if (username == 'Angie McGaha') {
      return 'img/p3.png';
    } else if (username == 'Debra Gardner') {
      return 'img/p4.png';
    } else if (username == 'Joe Rodgers') {
      return 'img/p2.png';
    } else if (username == 'Eric Moreno') {
      return 'img/p5.png';
    } else if (username == 'Anna Daniels') {
      return 'img/p1.png';
    }

  };


  $scope.getMockData();

})

.filter('searchJobs', function() {
  return function(items, query) {
    if (items) {
      var filtered = [];
      var letterMatch = new RegExp(query, 'i');
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (query) {
          if (letterMatch.test(item.customer.substring(0, query.length)) ||
            letterMatch.test(item.workOrder.substring(0, query.length)) ||
            letterMatch.test(item.status)) {
            filtered.push(item);
          }


        } else {
          filtered.push(item);
        }
      }
      return filtered;
    }
  };
})

.filter('tel', function() {
  return function(tel) {
    if (!tel) {
      return '';
    }

    var value = tel.toString().trim().replace(/^\+/, '');

    if (value.match(/[^0-9]/)) {
      return tel;
    }

    var country, city, number;

    switch (value.length) {
      case 10: // +1PPP####### -> C (PPP) ###-####
        country = 1;
        city = value.slice(0, 3);
        number = value.slice(3);
        break;

      case 11: // +CPPP####### -> CCC (PP) ###-####
        country = value[0];
        city = value.slice(1, 4);
        number = value.slice(4);
        break;

      case 12: // +CCCPP####### -> CCC (PP) ###-####
        country = value.slice(0, 3);
        city = value.slice(3, 5);
        number = value.slice(5);
        break;

      default:
        return tel;
    }

    if (country == 1) {
      country = "";
    }

    number = number.slice(0, 3) + '-' + number.slice(3);

    return (country + " (" + city + ") " + number).trim();
  };
});
