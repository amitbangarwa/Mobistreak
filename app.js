/**
 * Created by amit on 11/5/16.
 */

var express = require('express');
var app = express();
var RestClient = require('node-rest-client').Client;
var restClient = new RestClient();
var bodyParser = require('body-parser');

app.set('view engine', 'html');
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/assets'));
app.get('/',function(req,res){
    res.sendFile('index.html');
    //It will find and locate index.html from View or Scripts
});
app.use(bodyParser.json());

require('./app/githubFinderApi')(app, restClient);

var server = app.listen(3300, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
});