const https = require('https');
//const http = require('http');
const fs = require('fs');

const options = {
	key: fs.readFileSync('./certs/private.key'),
	cert: fs.readFileSync('./certs/test.crt')
};

var app = https.createServer(options, function (request, response) {
	//var app = http.createServer(function (request, response) {
	var url = request.url;
	if (request.url == '/') {
		url = '/index.html';
	}
/*	if (request.url == '/favicon.ico') {
		return response.writeHead(404);
	}
*/	response.writeHead(200);
	response.end(fs.readFileSync(__dirname + url));

});
app.listen(3000);