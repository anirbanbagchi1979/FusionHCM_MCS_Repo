module.exports = function(service) {


    /**
     *  The file samples.txt in the archive that this file was packaged with contains some example code.
     */


    service.get('/mobile/custom/ExpenseReportImages_AB/filesList/:expenseReportID', function(req, res) {
        var result = {};
        var inputFolderID = "FEE38DE6AD920C7AC87E81DAF6C3FF17C1177A968060"; //W14154
        var expenseRptID = req.params.expenseReportID;
        var sdkInstance = req.oracleMobile;
        var async = require('async');
        async.waterfall([
                function(callback) {
                    var uriPoint = '/mobile/connector/DocCS_Connector_AB' + '/folders/' + inputFolderID + '/items';
                    var optionsList = {
                        uri: uriPoint
                    };

                    sdkInstance.rest.get(optionsList, function(error, response, body) {
                        if (error) {
                            // propagate SDK error. This terminates the waterfall.
                            callback({
                                sdkError: error
                            });
                        } else {
                            /* This continues the waterfall, 
                             * passing collections to next call 
                             */
                            var listOfItems = JSON.parse(body);
                            var itemsArray = listOfItems.items;

                            for (var i = 0; i < itemsArray.length; i++) {
                                var current = itemsArray[i];
                                if (current.name == expenseRptID) {
                                    var folder = {
                                        "id": current.id,
                                        "name": current.name
                                    };
                                    console.log("Ani:folder" + JSON.stringify(folder));
                                    //result.folderLV1 = folder;
                                    callback(null, folder);
                                }

                            }

                        }
                    });
                },
                function(folder, callback) {
                    var uriPoint = '/mobile/connector/DocCS_Connector_AB' + '/folders/' + folder.id + '/items';
                    var optionsList = {
                        uri: uriPoint
                    };

                    sdkInstance.rest.get(optionsList, function(error, response, body) {
                        if (error) {
                            // propagate SDK error. This terminates the waterfall.
                            callback({
                                sdkError: error
                            });
                        } else {
                            /* This continues the waterfall, 
                             * passing collections to next call 
                             */
                            var listOfItems = JSON.parse(body);
                            var itemsArray = listOfItems.items;
                            var fileList = [];
                            for (var i = 0; i < itemsArray.length; i++) {
                                var current = itemsArray[i];
                                if (current.type == "file") {
                                    var file = {
                                        "id": current.id,
                                        "name": current.name
                                    };
                                    fileList.push(file);
                                }
                            }
                        }
                        //console.log("AniLvl2:FileList" + JSON.stringify(fileList));
                        //result.fileList = fileList;
                        callback(null, fileList);

                    });
                },
                function(fileList, callback) {
                    /* The data parameter has the value of body from the previous
                     * call, which was passed through the previous callback.
                     */
                    result.images = [];
                    var getImage = function(fileCurrent, doneCallback) {
                        var uriPoint = '/mobile/connector/DocCS_Connector_AB' + '/files/' + fileCurrent.id + '/data';
                        var optionsListNew = {
                            uri: uriPoint,
                            encoding: null
                        };

                        sdkInstance.rest.get(optionsListNew, function(error, response, body) {
                            if (error) {
                                /* This propagates the SDK error and 
                                 * terminates the waterfall
                                 */
                                callback({
                                    sdkError: error
                                });
                            } else {
                                var base64data = new Buffer(body, 'utf8').toString('base64');
                                fileCurrent.base64Image = base64data;
                                console.log("AniLvl3AsyncUpdated:File" + JSON.stringify(fileCurrent));
                                result.images.push(fileCurrent);
                                return doneCallback(null);
                                //fileList[i].base64Image = base64data;

                            }
                        });
                        // Nothing went wrong, so callback with a null error.
                        //

                    };

                    // Square each number in the array [1, 2, 3, 4]
                    async.each(fileList, getImage, function(err) {
                        // Square has been called on each of the numbers
                        // so we're now done!
                        console.log("ok Finished!");
                        callback(null, fileList);
                    });


                    // result.fileList = fileList;

                }

            ],
            /* The optional callback is invoked when all operations are 
             * have completed successfully, or when one of 
             * the operations errors out. 
             */
            function(err, result) {
                /* On success, result has the value of body from 
                 * the last call
                 */
                if (err) {
                    res.send(500, err);
                } else {
                    res.send(200, result);
                }
            }
        );
    });

};