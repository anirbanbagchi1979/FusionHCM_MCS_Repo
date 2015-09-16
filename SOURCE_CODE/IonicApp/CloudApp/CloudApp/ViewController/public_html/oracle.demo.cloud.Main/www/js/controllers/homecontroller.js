angular.module('css.controllers')
  .controller('HomeCtrl', function($scope, WOService,
     UserAuthService) {

    $scope.filterCriteria = {status : ''};
    $scope.searchValue = '';
    $scope.getIcon = function(status) {

      return status.replace(/[^a-zA-Z ]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase() + '-icon';
    };

    $scope.getTickerClass = function(status) {

      return status.replace(/[^a-zA-Z ]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase();

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

    $scope.groupBy = function(array, f) {
      var groups = {};
      array.forEach(function(o) {
        var group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
      });
      return Object.keys(groups).map(function(group) {
        return groups[group];
      });
    };

    $scope.createTrainStops = function(jobs) {
      var trainSteps = $scope.groupBy(jobs, function(item) {
        return [item.status];
      });
      return trainSteps;

    };


    $scope.getMockData = function() {
      
        WOService.getWorkOrders().success(function(data) {
          console.log(data);
          $scope.employees = data;
          //$scope.trainSteps = $scope.createTrainStops($scope.shopjobs);
        });

      

      //$scope.trainSteps = StatusService.getMockStatus();
      //$scope.news = NewsService.getMockNews();
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
    $scope.clearFilters = function(){
      $scope.filterCriteria = {status : ''};

    };

    $scope.setFilter = function(statusVal){
      $scope.filterCriteria = {status : statusVal};
    };

    $scope.saveCSV = function(statusVal){
      WOService.getCSV().success(function(data) {
        console.log(data);
        var anchor = angular.element('<a/>');
      anchor.attr({
          href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data),
          target: '_blank',
          download: 'WorkOrders.csv'
      })[0].click();
      });
    };

    $scope.getMockData();

  });
