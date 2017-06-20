var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var artistSchema = mongoose.Schema({
  artist: {
    name: {
      type: String,
      unique: true
    },
    albums: [
      {
        song: String,
        url: String,
        image: String
      }
    ]
  }
});

var dbs = mongoose.model('artist', artistSchema);

var selectAll = function(callback) {
  dbs.find({}, function(err, artist) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, artist.albums);
    }
  });
};

var selectOne = function(name, callback) {
  dbs.find({name: name}, function(err, artist) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, artist);
    }
  })
}

module.exports = selectAll;
module.exports = selectOne;
module.exports = dbs;