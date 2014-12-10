'use strict';

var http = require('http');
/**
 * HTTP Call - POST - To Create Notes
 */


exports.createFileInDropBox= function(note)
{

    var newJson = JSON.stringify({'title': note.name, 'content': note.content, 'notebookid' : note.notebookId,'id': note._id});
    console.log('newJson' + newJson);



    var postheaders = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(newJson, 'utf8')
    };
    var optionspost = {
        host: 'localhost',
        port: 8080,
        path: '/api/v1/notes',
        method: 'POST',
        headers: postheaders
    };

    var reqPost = http.request(optionspost, function (res) {

        res.on('data', function (d) {
            console.log('file changed');
            process.stdout.write(d);

        });
    });
    reqPost.write(newJson);
    reqPost.end();
    reqPost.on('error', function (e) {
        console.error('error: '+e);
    });

    console.log('operation successful');
};
exports.deleteFileInDropBox = function(notebookId,noteName)
{
    var newJson = JSON.stringify({'notebookid': notebookId,'title':noteName});
    console.log('newJson' + newJson);

    var deleteheaders = {
        'Content-Type' : 'application/json',
        'Content-Length' : Buffer.byteLength(newJson, 'utf8')
    };

        var optionsdelete = {
        host : 'localhost',
        port : 8080,
        path : '/api/v1/notes',
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


