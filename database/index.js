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

module.exports = dbs;