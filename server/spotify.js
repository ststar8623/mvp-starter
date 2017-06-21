var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var dbs = require('../database');

var spotify = function(name ,response) {
  // sportify API search starts here
  let artistName = name;
  let spArtist = artistName.split(' ').join('+');
  let token = 'BQBYT2BQYcRBcqpQ-zoW-puqPz4TWhECku0nlgyx8VvCVqXalFpluIWvwLvNND6eeE0CzpP-0zIGD0A5VJJbw_3KkFISJKWT_M6EYKTT3oO6S4A2pUrdpAgjhxOsuO3gfCkUWFaU3Nz7wL1G7ETUyk-yd92S87yy5TNm4HlY2D4rFegRPnCP3SI20T_VIdvHrNnE5oBq28d3iHWoT1FQ3N_uHswS1AivYcgeIwVknhL_VTamIvDfNQ5pTDyEAvHRn3zMSxWOteClVslk50sG13WNPmxRbhZ6PMf6gDsSlikeoStdxTs';
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
      artist.artist.albums.push({song: album.name, url: album.external_urls.spotify, image:album.album.images[2].url})
    });
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