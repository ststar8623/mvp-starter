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
  let artists = req.body.artist.split(' ').join('+');
  console.log('artist name: ', artists);
  let token = 'BQD_dQH-UC1xw194PE9tgrz6KI-9Yk1EnU14boSw5qXs2Psqvl9PvqCYDM_9Y1ytkm-KVpy0hp7QWzMhGCVXTdD2JbuQ4SqcWGHCR63WpC8SKVCEm2L6ZFbybT5kBxNaQUXxiwoZanDZpFm6QuBDbVblIHkhQZkgeO5jfkyW2PpF1F65MSO_zaQ';
  let url = 'https://api.spotify.com/v1/search?q=';
  let query = url + artists + '&type=track&limit=1';
  let options = {
    url: query,
    headers: {
      Authorization: 'Bearer ' + token
    }
  };
  request(options).then(res => {
    let result = res.body;
    let artist = new dbs();

    artist.name = artists;
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

