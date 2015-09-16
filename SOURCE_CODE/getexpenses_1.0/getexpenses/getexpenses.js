

module.exports = function(service) {

	/**
	 *  The file samples.txt in the archive that this file was packaged with contains some example code.
	 */


	service.get('/mobile/custom/getexpenses/expenses/:id', function(req,res) {
		var parseString = require('xml2js').parseString;
		var stripPrefix = require('./node_modules/xml2js/lib/processors.js').stripPrefix;
		
		var sdkInstance = req.oracleMobile;
		  // The first argument is the optionsList object.
    	  var expenseID =req.params.id ;
		  var result = {} ;
		  // This handler simply forwards the response.
		  var handler = function (error, response, body) {
			if (error) {
			  res.send(500, error.message);
			} else {
				result.InputExpenseId = expenseID;
				parseString(body,  { explicitArray : false, ignoreAttrs : true,tagNameProcessors: [stripPrefix]}, function (err, output) {
   
				var expReport = output.Envelope.Body.getExpenseReportResponse.result;
				var ExpenseReport = {};
				 ExpenseReport.ExpenseReportId= expReport.ExpenseReportId;
				 ExpenseReport.ReimbursementCurrencyCode= expReport.ReimbursementCurrencyCode;
				 ExpenseReport.CurrentApproverId= expReport.CurrentApproverId;
				 ExpenseReport.ReportSubmitDate= expReport.ReportSubmitDate;
				 ExpenseReport.ExpenseStatusCode= expReport.ExpenseStatusCode;
				 ExpenseReport.ReceiptsStatusCode = expReport.ReceiptsStatusCode;
				 
				 var ExpenseLines = [];
				 var lines = expReport.Expense;
				 for(var i=0;i<lines.length;i++)
				 {
					 var expenseLine =  {
						 ExpenseCategoryCode: lines[i].ExpenseCategoryCode,
						 ExpenseTypeCategoryCode:lines[i].ExpenseTypeCategoryCode,
						 MerchantName:lines[i].MerchantName,
						 ExpenseTypeName:lines[i].ExpenseTypeName,
						 Amount: lines[i].ReimbursableAmount
					 };
					 ExpenseLines.push(expenseLine);
					 
				 }
				 ExpenseReport.Lines = ExpenseLines;
				 result = ExpenseReport;
				 //console.dir(JSON.stringify(ExpenseReport));
				});
				
				//console.log("returning " + JSON.stringify(result));
				res.send(200, result);
			  //res.send(response.statusCode, body);
			}
		  };
         var xmlInput = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:typ="http://xmlns.oracle.com/apps/financials/expenses/shared/common/expenseExternalService/types/">    <soapenv:Header/>    <soapenv:Body>       <typ:getExpenseReport>          <typ:expenseReportId>'+expenseID +'</typ:expenseReportId>       </typ:getExpenseReport>    </soapenv:Body> </soapenv:Envelope>';
		 var optionsList = {
		  uri: '/mobile/connector/financials_expense/getExpenseReport', headers: {'Content-Type': 'application/xml;charset=UTF-8' , 'Accept': 'application/xml'} , 
		  body:xmlInput };
		 var sdkInstance = req.oracleMobile;
		 sdkInstance.rest.post(optionsList,handler);
	});

};
