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

  let dbSearch = new Promise((resolve, reject) => {
    dbs.find(obj, function(err, data) {
      if (err) {
        reject(err);
      } else {
        console.log(data);
        return resolve(data);
      }
    });
  });
  
  dbSearch.then(result => {
    if (result.length === 0) {
      spot.spotify(artistName, res);
    } else {
      res.json(result);
    }
  });

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
});

app.post('/remove', function(req, res) {
  let artistName = req.body.artist;
  dbs.remove({'artist.name':artistName}, function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send('Artist has been removed from the database');
    }
  });
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});