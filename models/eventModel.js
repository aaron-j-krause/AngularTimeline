var mongoose = require('mongoose');
var Timeline = require('../models/timelineModel');
var Schema = mongoose.Schema;

var eventSchema = new Schema ({
  name: String,
  start: Number,
  end: Number,
  timelineId: Schema.Types.ObjectId
});

eventSchema.pre('remove', function(next) {
    this.model('Timeline').update(
        {ev: this._id},
        {$pull: {ev: this._id}},
        {multi: true},
        next
    );
})

module.exports = mongoose.model('Event', eventSchema);
