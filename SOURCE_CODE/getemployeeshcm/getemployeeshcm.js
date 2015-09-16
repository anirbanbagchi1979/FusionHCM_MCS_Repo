module.exports = function(service) {


	/**
	 *  The file samples.txt in the archive that this file was packaged with contains some example code.
	 */


	service.get('/mobile/custom/getemployeesHCM/employees', function(req,res) {
		var result = {};

		var handler = function (error, response, body) {
			if (error) {
			  res.send(500, error.message);
			} else {

				try{
					var employees = [];
					var listOfEmployees = JSON.parse(body);
					var employeesArray = listOfEmployees.items;
					for (var i=0; i<employeesArray.length; i++){
						var current = employeesArray[i];

						var employee = {
										"DisplayName" : current.DisplayName,
										"FirstName" : current.FirstName,
										"PersonNumber" : current.PersonNumber,
										"PersonId" : current.PersonId,
										"WorkPhoneCountryCode" : current.WorkPhoneCountryCode,
										"WorkPhoneAreaCode" : current.WorkPhoneAreaCode,
										"WorkPhoneNumber" :current.WorkPhoneNumber,
										"WorkEmail" :current.WorkEmail,
										"AddressLine1" :current.AddressLine1,
										"City" :current.City,
										"Country" :current.Country
										};
						employees.push(employee);
					}
				result.Employees = employees;
				}catch(ex)
				{
					console.log("Exception" + ex);
					result.exception = JSON.stringify(ex);
				}
				res.send(200, result);
			}

		};
		var optionsList = {
		  uri: '/mobile/connector/HCM_TestConnector_AB',  headers: {'Accept-Encoding': 'None'}

		  };
		var sdkInstance = req.oracleMobile;
		sdkInstance.rest.get(optionsList,handler);
	});

	service.get('/mobile/custom/getemployeesHCM/employees/:first_name', function(req,res) {

		var inputFirstName = req.params.first_name;
		var result = {};

		var handler = function (error, response, body) {
			if (error) {
			  res.send(500, error.message);
			} else {

				try{
					var employees = [];
					var listOfEmployees = JSON.parse(body);
					var employeesArray = listOfEmployees.items;
					for (var i=0; i<employeesArray.length; i++){
						var current = employeesArray[i];

						var employee = {
										"DisplayName" : current.DisplayName,
										"FirstName" : current.FirstName,
										"PersonNumber" : current.PersonNumber,
										"PersonId" : current.PersonId,
										"WorkPhoneCountryCode" : current.WorkPhoneCountryCode,
										"WorkPhoneAreaCode" : current.WorkPhoneAreaCode,
										"WorkPhoneNumber" :current.WorkPhoneNumber,
										"WorkEmail" :current.WorkEmail,
										"AddressLine1" :current.AddressLine1,
										"City" :current.City,
										"Country" :current.Country
										};
						employees.push(employee);
					}
				result.Employees = employees;
				}catch(ex)
				{
					console.log("Exception" + ex);
					result.exception = JSON.stringify(ex);
				}
				res.send(200, result);
			}

		};
		var uriPoint = '/mobile/connector/HCM_TestConnector_AB/?q=FirstName='+inputFirstName;
		var optionsList = {
		  uri: uriPoint,  headers: {'Accept-Encoding': 'None'}

		  };
		var sdkInstance = req.oracleMobile;
		sdkInstance.rest.get(optionsList,handler);
	});

	service.get('/mobile/custom/getemployeesHCM/employees/search/:personID', function(req,res) {
		var async = require('async');
		
		var sdkInstance = req.oracleMobile;
		
		var inputPersonID = req.params.personID;


		var result = {};
					
		async.waterfall([
				function (callback) {
					var uriPoint =  '/mobile/connector/HCM_TestConnector_AB?finder=findByPersonId;PersonId=' +inputPersonID+ '&expand=photo';
					var optionsList = {
					  uri: uriPoint,  headers: {'Accept-Encoding': 'None'}
					  };

					sdkInstance.rest.get(optionsList, function (error, response, body) {
					if (error) {
					  // propagate SDK error. This terminates the waterfall.
					  callback({sdkError: error});
					}
					else {
					  /* This continues the waterfall, 
					   * passing collections to next call 
					   */
							var listOfEmployees = JSON.parse(body);
							var employeesArray = listOfEmployees.items;
							var current = employeesArray[0];
							var employeePhotoConnector = null;
							if(current.photo.length > 0) {
								
								var photoDetailsLinks = current.photo[0].links;
								var photoLinkToDownload;
								for(var x=0;x<photoDetailsLinks.length;x++)
								{
									if(photoDetailsLinks[x].rel=='enclosure')
										photoLinkToDownload = photoDetailsLinks[x].href
								}

								var baseURL = listOfEmployees.links[0].href;

								var index = photoLinkToDownload.indexOf(baseURL);
								if(index != -1)
									var photoLinkToConnector = photoLinkToDownload.substr(baseURL.length) 

								employeePhotoConnector =  '/mobile/connector/HCM_TestConnector_AB' +photoLinkToConnector;
							}
							var employee = {
												"DisplayName" : current.DisplayName,
												"FirstName" : current.FirstName,
												"PersonNumber" : current.PersonNumber,
												"PersonId" : current.PersonId,
												"WorkPhoneCountryCode" : current.WorkPhoneCountryCode,
												"WorkPhoneAreaCode" : current.WorkPhoneAreaCode,
												"WorkPhoneNumber" :current.WorkPhoneNumber,
												"WorkEmail" :current.WorkEmail,
												"AddressLine1" :current.AddressLine1,
												"City" :current.City,
												"Country" :current.Country,
												"PhotoLink" : employeePhotoConnector
												};

							callback(null, employee);
							
					}
				  });
				},
				function (employeeData, callback) {
				  /* The data parameter has the value of body from the previous
				   * call, which was passed through the previous callback.
				   */
				   var photoLink = employeeData.PhotoLink;
				   delete employeeData.PhotoLink;
				   if(photoLink != null ){
					var optionsListNew = {
						uri: photoLink,  encoding: null
						};

				  sdkInstance.rest.get(optionsListNew, function (error, response, body) {
					if (error) {
					  /* This propagates the SDK error and 
					   * terminates the waterfall
					   */
					  callback({sdkError: error});
					}
					else {
						  var base64data = new Buffer(body, 'binary').toString('base64');
						  employeeData.base64Image = base64data;
						  
						  callback(null, employeeData);
						  
					}
				  });
				  }
				  else
						 callback(null, employeeData);
				}
			  ],
				/* The optional callback is invoked when all operations are 
				 * have completed successfully, or when one of 
				 * the operations errors out. 
				 */
				  function (err, result) {
					/* On success, result has the value of body from 
					 * the last call
					 */
					if (err) {
					  res.send(500, err);
					}
					else {
					  res.send(200,result);
					}
				  }
				);
	});
	


};
