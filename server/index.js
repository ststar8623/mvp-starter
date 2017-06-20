var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var spot = require('./spotify');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var dbs = require('../database');
var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({extended: true}));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));
app.get('/search', function(req, res) {
  let artistName = req.url.substring(15).replace('%20', ' ').toLowerCase();
  let obj = {'artist.name': artistName}

  dbs.find(obj, function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
    spot.spotify(artistName);
  });

});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

app.get('/database', function(req, res) {
  let artistName = req.url.substring(17).replace('%20', ' ').toLowerCase();
  let obj = {};
  if (artistName) {
    obj = {
      'artist.name': artistName
    };
  }
  dbs.find(obj, function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
})