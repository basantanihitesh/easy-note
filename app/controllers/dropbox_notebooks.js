'use strict';


    var http = require('http');

    /**
     * HTTP Call - POST - To Create Notebooks
     */

    exports.createFolderInDropBox= function(notebooks)
    {

        var newJson = JSON.stringify({'id': notebooks._id, 'name': notebooks.name});
        console.log('newJson' + newJson);


        var postheaders = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(newJson, 'utf8')
        };
        var optionspost = {
            host: 'localhost',
            port: 8080,
            path: '/api/v1/notebooks',
            method: 'POST',
            headers: postheaders
        };

        var reqPost = http.request(optionspost, function (res) {

            res.on('data', function (d) {

                process.stdout.write(d);

            });
        });
        reqPost.write(newJson);
        reqPost.end();
        reqPost.on('error', function (e) {
            console.error(e);
        });

console.log('operation successful');
    };

exports.deleteFolderInDropBox = function(notebookName)
{
    var newJson = JSON.stringify({'name':notebookName});
    console.log('newJson' + newJson);

    var deleteheaders = {
        'Content-Type' : 'application/json',
        'Content-Length' : Buffer.byteLength(newJson, 'utf8')
    };

    var optionsdelete = {
        host : 'localhost',
        port : 8080,
        path : '/api/v1/notebooks',
        method : 'DELETE',
        headers : deleteheaders
    };

    var reqDelete = http.request(optionsdelete, function(res) {

        res.on('data', function(d) {

            process.stdout.write(d);

        });
    });
    reqDelete.write(newJson);
    reqDelete.end();
    reqDelete.on('error', function(e) {
        console.error(e);
    });
    console.log('delete operation successful');
};
