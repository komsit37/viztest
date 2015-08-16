var express = require('express');
var request = require('request');
var CONFIG = require('config');

var app = express();

app.use(express.static('public'));

//proxy to external server to avoid CORS restriction in browser
app.use('/api/elastic', function(req, res) {
    var url = CONFIG.ELASTIC + req.url;
    req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 3000);