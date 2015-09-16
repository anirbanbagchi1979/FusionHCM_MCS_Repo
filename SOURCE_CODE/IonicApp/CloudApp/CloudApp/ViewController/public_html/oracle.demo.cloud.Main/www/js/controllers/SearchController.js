//Direct API function chaing style.
//Concise and efficient, but perhaps slightly poor readability.
angular.module('css.controllers')

.controller('SearchController', function($scope, $ionicModal, $timeout,
  $ionicPopover, $ionicHistory, UserAuthService, WOService) {
  // Form data for the login modal
  $scope.searchData = {};

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

    //$scope.trainSteps = StatusService.getMockStatus();
    $scope.news = NewsService.getMockNews();
  };

  $scope.getMockData();

});
