 var http = require('http');

 /**
 * HTTP Call - POST - To Create Notes
 */

jsonObject = JSON.stringify({
  "title": "Test From NODE.JS",
  "content" : "Data updated",
  "notebookid" : "5455607afc6e8300d6b186e0"
});
 

var postheaders = {
    'Content-Type' : 'application/json',
    'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
};
 

var optionspost = {
    host : 'localhost',
    port : 8080,
    path : '/api/v1/notes',
    method : 'POST',
    headers : postheaders
    
    
};
 
console.info('Options prepared:');
console.info(optionspost);
console.info('Do the POST call');
 

var reqPost = http.request(optionspost, function(res) {
    console.log("statusCode: ", res.statusCode);
 
    res.on('data', function(d) {
        console.info('POST result:\n');
        process.stdout.write(d);
        console.info('\n\nPOST completed');
    });
});
 

reqPost.write(jsonObject);
reqPost.end();
reqPost.on('error', function(e) {
    console.error(e);
});
 
