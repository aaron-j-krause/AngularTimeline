var Timeline = require('../models/timelineModel');
var Event = require('../models/eventModel')

module.exports = function(router) {

  router.get('/', function(req, res) {
    Timeline.find({}).populate('ev').exec(function(err, timelines) {
      if (err) return res.status(500).send('could not GET timelines')
      console.log(timelines);
      res.send(timelines);
    });
  });

  router.post('/', function(req, res) {
    var newTimeline = new Timeline(req.body);
    newTimeline.save(function(err, timeline) {
      if (err) return res.status(500).send('could not create timeline');
      res.json(timeline);
    });
  });

  router.delete('/:id', function(req, res) {
    Timeline.findByIdAndRemove(req.params.id, function(err, timeline) {
      if (err) return console.log(err);
      Event.find({timelineId: timeline._id}).remove(function(err, events) {

        res.json({msg: 'timeline deleted'})
      })
    });
  });
};
