var mongoose = require('mongoose');
var Timeline = require('../models/timelineModel');
var Event = require('../models/eventModel')

module.exports = function(router) {

  router.post('/new_event', function(req, res) {
    var newEvent = Event(req.body);
    newEvent.save(function(err, event) {
      if (err) return res.status(500).send('could not save event');

      Timeline.findByIdAndUpdate(newEvent.timelineId,
        {$push:{ev: event._id}}, function(err, timeline) {
          if(err) return res.status(500).send('could not save event');

          res.json(event)
      });
    });
  });

  router.delete('/:eventId', function(req, res) {
    Event.findById(req.params.eventId, function(err, event) {
      if (err) return res.status(500).send('could not delete')
      var tlId = event.timelineId;
      event.remove(function(err, event){

        Timeline.findById(event.timelineId).populate('ev').exec(function(err, timeline) {
          res.json({msg:'event deleted', events: timeline.ev})
        });
      });
    });
  });
};
