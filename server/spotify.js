var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var dbs = require('../database');

var spotify = function(name) {
  // sportify API search starts here
  let artistName = name;
  let spArtist = artistName.split(' ').join('+');
  let token = 'BQBvWKyu7r-i6lJuOZgrIwbPbXWzMwmMfBWXHXtVNutGbIulxnqT886xXTwHCVRz3jklyeQQn6LFVViu7rQMkDk4jX206RSJ4K-9UKx0aSmfS1tS826r1BuP0Dm08Hzt-xVg2l-a-W9quyYxSYjF8gJlMvDywbiWmJNORGgR_B-D3kgyF11EKq964Y_qKa1tU4Ei79rsuTFvycd_gJLYPr7silKFE4xRMouxu1Hp5E9ZOAu76w_zqV9s2CBhoQUNRDYHlyEyLFo-tuELRp1upaZ-6fY';
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
    // create new db instance
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
    console.log('artist is being saved --------->', artist, '<--------');
  })
}

module.exports.spotify = spotify;