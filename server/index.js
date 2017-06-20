var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var dbs = require('../database-mongo');

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
  let token = 'BQA_FUa4lYxhzs5t7OIEOwZHItukGN9CqcR5bK8mxNCWUlXpR7ZSMZMbzuo4Oz2cEtI5Da_zbCXPPdqLLVFGD9KcjlNrtJyKJE8V8L7VqEoHLPTSjQuvRwbUqSAO-o5eZpZu2JNJQECFUJR_sNcE98d4IXJV6X-AkKrrmDxBC_fA0ORWgr1M9ic';
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
    console.log(artist);
  })

});

// app.get('/items', function (req, res) {
//   items.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

