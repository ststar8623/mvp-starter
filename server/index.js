var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
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
app.post('/search', function(req, res) {
  let artistName = req.body.artist;
  let spArtist = artistName.split(' ').join('+');
  let token = 'BQCf6rO2Aj304SDj2Urjr0C-L637UA0wdaDZnoeUuLNWHEN4v6itwBsyso1zqLDxSXB61q8_5lMUiih_BMlx4JgyyHJ0u_67TM0ROcZYRSUCdePlt2gnMQgkuGZr6SG98R4d1ZNBurmuixkKQ8mmlU9RsBqP6UcFjrPH7BQY_1ilYb7q3oQJaEc';
  let url = 'https://api.spotify.com/v1/search?q=';
  let query = url + spArtist + '&type=track&limit=10';
  let options = {
    url: query,
    headers: {
      Authorization: 'Bearer ' + token
    }
  };
  request(options).then(res => {
    let result = JSON.parse(res.body);
    let artist = new dbs();
  
    artist.name = artistName;
    result.tracks.items.map(album => {
      artist.albums.push({song: album.name, url: album.href})
    });
    artist.save((err, res) => {
      if (err) {
        console.log(`Sorry either ${artistName} is incorrect or ${artistName} already exists in the database`);
      } else {
        console.log(`${artistName} successfully saved to database`);
      }
    });
  })

});

app.get('/database', function (req, res) {
  let artist = req.url.substring(17);
  console.log(artist);
  dbs.find(artist ,function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

