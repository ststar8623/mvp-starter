var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var dbs = require('../database');

var spotify = function(name ,response) {
  // sportify API search starts here
  let artistName = name;
  let spArtist = artistName.split(' ').join('+');
  let token = 'BQCEPVz7M_-rAVcTF8GzigUfDMOB90nWxmgHPyvsJ698STzL_W5dO0aBTyO7c--q1eKe_5LIObCY0pciz4sbBPWjb3gmjf5tOp9DGayEhh9CI39Unplb5MLg5QkJ1ampFnxZfxrWg9j3I65yccenkfQKQeNo0fIx9tGzVmRItEwLfHU-AHMnAwJ9hp_ztQlwO312kGZqREioBbrxSE8aTRLEVALpleuKeOuQpa83UQe4yQyEqZT9tESS7mOfoeejCNHaVDenrZmhmIKrHPCxxUhMBRs';
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
    console.log('ARTIST::::: ', artist);
    artist.save((err, res) => {
      if (err) {
        console.log(`Sorry either ${artistName} is incorrect or ${artistName} already exists in the database`, err);
      } else {
        console.log(`${artistName} successfully saved to database`);
      }
    });
    response.json(artist);
  })
}

module.exports.spotify = spotify;