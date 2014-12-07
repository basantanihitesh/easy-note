var http = require('http');

/**
 * HTTP Call - DELETE - To Delete Notes
 */

jsonObject = JSON.stringify({
 "title" : "Test From NODE.JS",
 "notebookid" : "5455607afc6e8300d6b186e0"
 });
 

var deleteheaders = {
    'Content-Type' : 'application/json',
    'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
};
 

var optionsdelete = {
    host : 'localhost',
    port : 8080,
    path : '/api/v1/notes',
    method : 'DELETE',
    headers : deleteheaders
    
    
};
 
console.info('Options prepared:');
console.info(optionsdelete);
console.info('Do the DELETE call');
 

var reqDelete = http.request(optionsdelete, function(res) {
    console.log("statusCode: ", res.statusCode);
 
    res.on('data', function(d) {
        console.info('Delete result:\n');
        process.stdout.write(d);
        console.info('\n\nDelete completed');
    });
});
 

reqDelete.write(jsonObject);
reqDelete.end();
reqDelete.on('error', function(e) {
    console.error(e);
});