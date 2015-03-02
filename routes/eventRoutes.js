var mongoose = require('mongoose');
var Timeline = require('../models/timelineModel');
var Event = require('../models/eventModel')

module.exports = function(router) {

  router.post('/new_event', function(req, res) {
    console.log('REQUEST BODY', req.body);
    var newEvent = Event(req.body);
    newEvent.save(function(err, event) {
      if (err) return res.status(500).send('could not save event');

      Timeline.findByIdAndUpdate(newEvent.timelineId,
        {$push:{ev: event._id}}, function(err, timeline) {
          if(err) return res.status(500).send('could not save event');

          res.json({msg: 'new event created'})
     
        })
    
    });
  });
}