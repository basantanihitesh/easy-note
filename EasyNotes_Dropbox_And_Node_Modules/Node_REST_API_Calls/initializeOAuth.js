var http = require('http');

 /**
 * HTTP Call - GET - initializeOAuth
 */


var optionsget = {
    host : 'localhost',
    port : 8080,
    path : '/api/v1/initializeOAuth',
    method : 'GET',
};
 
console.info('Options prepared:');
console.info(optionsget);
console.info('Do the GET call');
 

var reqGET = http.request(optionsget, function(res) {
    console.log("statusCode: ", res.statusCode);
        
    res.on('data', function(d) {
        console.info('GET result:\n');
        
        
        
        
        var redirectURL = d.toString();// Redirect to this URL
        
        console.info(redirectURL);


        console.info('\n\nGET completed');
    });
});
 
reqGET.end();
reqGET.on('error', function(e) {
    console.error(e);
});
 


