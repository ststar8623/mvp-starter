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
  name: {
    type: String,
    unique: true
  },
  albums: [
    {
      song: String,
      url: String
    }
  ]
});

var dbs = mongoose.model('artist', artistSchema);

var selectAll = function(callback) {
  dbs.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;
module.exports = dbs;