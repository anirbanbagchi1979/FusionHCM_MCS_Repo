angular.module('css.controllers')
  .factory('WOService', function($q, localstorage, UserAuthService, HostMcsUrl,
    MCSBackendID, $http) {
    return {

      getWorkOrders: function() {
        // var getUrl = HostMcsUrl + '/mobile/custom/css/workOrders';
        // var req = {
        //   method: 'GET',
        //   url: getUrl,
        //   /* we should look automate this process here as well */
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Oracle-Mobile-Backend-Id': MCSBackendID
        //
        //   }
        //   // data: 'grant_type=password&username=' + username + '&password=' + password
        //   //data: 'grant_type=password&username=lynn&password=123456'
        // };
        // console.log(req);
        // return $http(req);
        var mData =  this.getStuff();
        var mock = {
          success : function(cb){
            cb(mData);
          },
          error : function(cb){
            cb();
          }
        }
        return mock;
      },

      getWorkOrdersFiltered: function() {
        // if (UserAuthService.isTechnician()) {
        //   var getUrl = HostMcsUrl + '/mobile/custom/css/myWorkOrders';
        //
        // } else if (UserAuthService.isServiceWriter()) {
        //   var getUrl = HostMcsUrl + '/mobile/custom/css/workOrders';
        // }
        //
        // var req = {
        //   method: 'GET',
        //   url: getUrl,
        //   /* we should look automate this process here as well */
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Oracle-Mobile-Backend-Id': MCSBackendID
        //
        //   }
        //   // data: 'grant_type=password&username=' + username + '&password=' + password
        //   //data: 'grant_type=password&username=lynn&password=123456'
        // };
        // console.log(req);
        // return $http(req);
        var mData =  this.getStuff();
        var mock = {
          success : function(cb){
            cb(mData);
          },
          error : function(cb){
            cb();
          },
          data : mData
        }
        return mock;

      },

      getWorkOrderById: function(workOrderID) {
        // var getUrl = '';
        // if (UserAuthService.isTechnician()) {
        //   getUrl = HostMcsUrl + '/mobile/custom/css/myWorkOrders/' +
        //   workOrderID;
        //
        // } else if (UserAuthService.isServiceWriter()) {
        //   getUrl = HostMcsUrl + '/mobile/custom/css/workOrders/' +
        //   workOrderID;
        // }
        // var req = {
        //   method: 'GET',
        //   url: getUrl,
        //   /* we should look automate this process here as well */
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Oracle-Mobile-Backend-Id': MCSBackendID
        //
        //   }
        //   // data: 'grant_type=password&username=' + username + '&password=' + password
        //   //data: 'grant_type=password&username=lynn&password=123456'
        // };
        // console.log(req);
        // return $http(req);
        var mData =  this.getStuff();
        var mock = {
          success : function(cb){
            cb(mData[0]);
          },
          error : function(cb){
            cb();
          },
          data : mData[0]
        }
        return mock;

      },

      createWorkOrder: function(workOrder) {
        console.log(workOrder);
        var postUrl = HostMcsUrl + '/mobile/custom/css/workOrders';
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

      getStuff: function(){
		  
        var mData =  [
			{
			  "DisplayName": "Andrew Hardaker",
			  "PersonNumber": "971",
			  "PersonId": 300000051360869,
			  "WorkPhoneCountryCode": "44",
			  "WorkPhoneAreaCode": "131",
			  "WorkPhoneNumber": "9253034",
			  "WorkEmail": "fap0074-andrew.hardaker@oracleads.com",
			  "AddressLine1": "56 Dumbarton Road",
			  "City": "London",
			  "Country": "GB",
			  "Expense":
					  {
						  "ExpenseReportId": "300000100107178",
						  "ReimbursementCurrencyCode": "USD",
						  "CurrentApproverId": "300000050712697",
						  "ReportSubmitDate": "2015-06-03",
						  "ExpenseStatusCode": "PEND_MGR_APPROVAL",
						  "ReceiptsStatusCode": "REQUIRED",
						  "Lines": [
							{
							  "ExpenseCategoryCode": "BUSINESS",
							  "ExpenseTypeCategoryCode": "AIRFARE",
							  "MerchantName": "United",
							  "ExpenseTypeName": "Air"
							},
							{
							  "ExpenseCategoryCode": "BUSINESS",
							  "ExpenseTypeCategoryCode": "CAR_RENTAL",
							  "MerchantName": "Hertz",
							  "ExpenseTypeName": "Car Rental"
							},
							{
							  "ExpenseCategoryCode": "BUSINESS",
							  "ExpenseTypeCategoryCode": "ACCOMMODATIONS",
							  "MerchantName": "Marriott",
							  "ExpenseTypeName": "Hotel"
							}
						  ]
					}

			},
			{
			  "DisplayName": "Andrew Moore",
			  "PersonNumber": "67",
			  "PersonId": 300000047734125,
			  "WorkPhoneCountryCode": "1",
			  "WorkPhoneAreaCode": "770",
			  "WorkPhoneNumber": "675-5387",
			  "WorkEmail": "fap0074-andrew.moore@oracleads.com",
			  "AddressLine1": "4992 Sutter Street",
			  "City": "Atlanta",
			  "Country": "US"
			},
			{
			  "DisplayName": "Andrew Mullen Anirban",
			  "PersonNumber": "1057",
			  "PersonId": 300000069329243,
			  "WorkPhoneCountryCode": null,
			  "WorkPhoneAreaCode": null,
			  "WorkPhoneNumber": null,
			  "WorkEmail": null,
			  "AddressLine1": "145 Riverview Drive",
			  "City": "San Francisco",
			  "Country": "US"
			},
			{
			  "DisplayName": "Andrew Strong",
			  "PersonNumber": "2202",
			  "PersonId": 300000101916154,
			  "WorkPhoneCountryCode": "1",
			  "WorkPhoneAreaCode": "655",
			  "WorkPhoneNumber": "123-4567",
			  "WorkEmail": null,
			  "AddressLine1": "1 Bayshore",
			  "City": "Santa Monica",
			  "Country": "US"
			}
			
		  ];
        return mData;
      }

    };
  });
