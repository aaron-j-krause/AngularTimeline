var mongoose = require('mongoose');
var Timeline = require('../models/timelineModel');
var Schema = mongoose.Schema;

var eventSchema = new Schema ({
  name: String,
  start: Number,
  end: Number,
  timelineId: Schema.Types.ObjectId
});

module.exports = mongoose.model('Event', eventSchema);
