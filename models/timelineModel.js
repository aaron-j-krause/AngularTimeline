exports = module.exports = {};

var mongoose = require('mongoose');

var timelineSchema = new mongoose.Schema({
  name: String,
  type: {type: String, default: 'public'},
  ev: [],
  color: [String]
})

module.exports = mongoose.model('Timeline', timelineSchema);
