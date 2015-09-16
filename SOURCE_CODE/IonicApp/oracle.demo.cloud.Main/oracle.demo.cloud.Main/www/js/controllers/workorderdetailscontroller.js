angular.module('css.controllers')
  .controller('WorkOrderDetailsCtrl', function($scope, employeeDetail,expenseReport,
    $stateParams, WOService) {

    $scope.selectedEmployee = employeeDetail.data;
	$scope.expenseReportDetails = expenseReport.data;
    //$scope.faultcodes = workOrder.data.faultCodes;

    $scope.state = '0';
    //$scope.steps = ['Job Overview', 'View History', 'Visual Inspection', 'Connect to ECM & Troubleshoot'];
    $scope.getTrainClass = function(index) {
      if(index == $scope.state){
        return 'selected-train-stop';
      }else{
        return 'unselected-train-stop';
      }
    };

  });
