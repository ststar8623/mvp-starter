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
  let token = 'BQBlt1vEuWwkuNoqJDLakI0c3LV3YIutEeHCtpJY8fdyZ4lk0xYJO12rpwXJfccQXRwv5tkxYQVSir4151TouIEcEle5JTxZBYETIx_rM-IlGPlx1VGHLNweTFylFcjGDPe1mT0H3Zzzx0SddDlUfdN3SiTmpzhjKpUtXYP_FEZGer2FDV5KJ-dQVXynUwudEHIo305cepMdLWENwnevOqGV6IGygOwyr78';
  let url = 'https://api.spotify.com/v1/search?q=';
  let query = url + spArtist + '&type=track&limit=10';
  let options = {
    url: query,
    headers: {
      Authorization: 'Bearer ' + token
    }
  };
  request(options).then(res => {
    let result = JSON.parse(res.body).tracks.items;
    let artist = new dbs();
  
    artist.artist.name = artistName;
    result.map(album => {
      artist.artist.albums.push({song: album.name, url: album.href, image:album.album.images[2].url})
    });
   
    artist.save((err, res) => {
      if (err) {
        console.log(`Sorry either ${artistName} is incorrect or ${artistName} already exists in the database`, err);
      } else {
        console.log(`${artistName} successfully saved to database`);
      }
    });
    console.log(artist);
  })

});

app.get('/database', function (req, res) {
  let artistName = req.url.substring(17).replace('%20', ' ');
  dbs.find({'artist.name': artistName} ,function(err, data) {
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

