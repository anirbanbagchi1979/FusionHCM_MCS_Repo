angular.module('css.controllers')
  .factory('WOService', function($q, localstorage, UserAuthService, HostMcsUrl,
    MCSBackendID, $http) {
    return {
	  getExpenseReportById: function() {
        // /alert("In get Expense report ")
        var getUrl = HostMcsUrl + '/mobile/custom/getexpenses/expenses/300000100107178';
        var req = {
          method: 'GET',
          url: getUrl,
          /* we should look automate this process here as well */
          headers: {
            'Content-Type': 'application/json',
            'Oracle-Mobile-Backend-Id': MCSBackendID
          }
          // data: 'grant_type=password&username=' + username + '&password=' + password
          //data: 'grant_type=password&username=lynn&password=123456'
        };

		var resp = $http(req);
		//alert("Anirban" + resp.data);
        return resp ;
      },

      getWorkOrders: function() {
		  //alert("In get WO")
        var getUrl = HostMcsUrl + '/mobile/custom/getemployeesHCM/employees';
        var req = {
          method: 'GET',
          url: getUrl,
          /* we should look automate this process here as well */
          headers: {
            'Content-Type': 'application/json',
            'Oracle-Mobile-Backend-Id': MCSBackendID

          }
          // data: 'grant_type=password&username=' + username + '&password=' + password
          //data: 'grant_type=password&username=lynn&password=123456'
        };
        //console.log("Anirban" + req);
		var resp = $http(req);
		//console.log("Anirban" + resp);
        return resp ;
      },

      getWorkOrdersFiltered: function() {
        if (UserAuthService.isTechnician()) {
          var getUrl = HostMcsUrl + '/mobile/custom/getemployeesHCM/employees';

        } else if (UserAuthService.isServiceWriter()) {
          var getUrl = HostMcsUrl + '/mobile/custom/getemployeesHCM/employees';
        }

        var req = {
          method: 'GET',
          url: getUrl,
          /* we should look automate this process here as well */
          headers: {
            'Content-Type': 'application/json',
            'Oracle-Mobile-Backend-Id': MCSBackendID

          }
          // data: 'grant_type=password&username=' + username + '&password=' + password
          //data: 'grant_type=password&username=lynn&password=123456'
        };
        console.log(req);
        return $http(req);

      },

      getWorkOrderById: function(workOrderID) {
		  //alert("PersonID" + workOrderID)
        var getUrl = '';
        if (UserAuthService.isTechnician()) {
          getUrl = HostMcsUrl + '/mobile/custom/getemployeesHCM/employees/search/' +
            workOrderID;

        } else if (UserAuthService.isServiceWriter()) {
          getUrl = HostMcsUrl + '/mobile/custom/getemployeesHCM/employees/search/' +
            workOrderID;
        }
        var req = {
          method: 'GET',
          url: getUrl,
          /* we should look automate this process here as well */
          headers: {
            'Content-Type': 'application/json',
            'Oracle-Mobile-Backend-Id': MCSBackendID

          }
          // data: 'grant_type=password&username=' + username + '&password=' + password
          //data: 'grant_type=password&username=lynn&password=123456'
        };
		//console.log("Anirban" + req);
		var resp = $http(req);
        return resp;

      },

      createWorkOrder: function(workOrder) {
        console.log(workOrder);
        var postUrl = HostMcsUrl + '/mobile/custom/css/workOrders';
        workOrder.sendEmail = '1';
        workOrder.to = 'anirban.bagchi@oracle.com';
        var req = {
          method: 'POST',
          url: postUrl,
          data: workOrder,
          /* we should look automate this process here as well */
          headers: {
            'Content-Type': 'application/json',
            'Oracle-Mobile-Backend-Id': MCSBackendID
          }
          // data: 'grant_type=password&username=' + username + '&password=' + password
          //data: 'grant_type=password&username=lynn&password=123456'
        };
        console.log(req);
        return $http(req);
      },

      updateDSID: function(workOrderID) {
        console.log(workOrderID);
        var postUrl = HostMcsUrl + '/mobile/custom/css/workOrders/' + workOrderID;
        var patchData = [{
          op: 'add',
          path: '/workOrders/dsid'
        }];
        var req = {
          method: 'PATCH',
          url: postUrl,
          data: patchData,
          /* we should look automate this process here as well */
          headers: {
            'Content-Type': 'application/json',
            'Oracle-Mobile-Backend-Id': MCSBackendID
          }
          // data: 'grant_type=password&username=' + username + '&password=' + password
          //data: 'grant_type=password&username=lynn&password=123456'
        };
        console.log(req);
        return $http(req);
      },

      prepareForQuote: function(workOrderID) {
        console.log(workOrderID);
        var postUrl = HostMcsUrl + '/mobile/custom/css/workOrders/' + workOrderID;
        var patchData = [{
          op: 'add',
          path: '/workOrders/quote',
          sendEmail:'1',
          to: 'anirban.bagchi@oracle.com'
        }];
        var req = {
          method: 'PATCH',
          url: postUrl,
          data: patchData,
          /* we should look automate this process here as well */
          headers: {
            'Content-Type': 'application/json',
            'Oracle-Mobile-Backend-Id': MCSBackendID
          }
          // data: 'grant_type=password&username=' + username + '&password=' + password
          //data: 'grant_type=password&username=lynn&password=123456'
        };
        console.log(req);
        return $http(req);
      },
      getCSV: function() {
        var getUrl = HostMcsUrl + '/mobile/custom/css/workOrders';
        var req = {
          method: 'GET',
          url: getUrl,
          /* we should look automate this process here as well */
          headers: {
            'Accept':'text/csv',
            'Content-Type': 'application/json',
            'Oracle-Mobile-Backend-Id': MCSBackendID

          }
          // data: 'grant_type=password&username=' + username + '&password=' + password
          //data: 'grant_type=password&username=lynn&password=123456'
        };
        console.log(req);
        return $http(req);
      }



    };
  });
