exports = module.exports = {};

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Event = require('../models/eventModel')

var timelineSchema = new Schema({
  name: String,
  type: {type: String, default: 'public'},
  ev: [{type: Schema.Types.ObjectId, ref: 'Event'}],
  color: [String]
})

module.exports = mongoose.model('Timeline', timelineSchema);
