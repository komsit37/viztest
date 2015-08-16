var express = require('express');
var request = require('request');
var CONFIG = require('config');

var app = express();

app.use(express.static('public'));

//proxy to external server to avoid CORS restriction in browser
//NOTE: don’t use bodyParser middleware on the same path, since you need the raw request body to be piped to the external server.
app.use('/api/elastic', function(req, res) {
    var url = CONFIG.ELASTIC + req.url;
    req.pipe(request(url)).pipe(res);
});

app.use('/api/kdb', function(req, res) {
    var url = 'http://localhost:5555/ipc' + req.url.substr(1);
    console.log(url);
    req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 3000);