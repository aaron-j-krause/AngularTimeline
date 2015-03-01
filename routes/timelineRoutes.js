var Timeline = require('../models/timelineModel');

module.exports = function(router) {

  router.get('/', function(req, res){
    Timeline.find({}, function(err, timelines) {
      if (err) return res.status(500).send('could not GET timelines')
      res.send(timelines);
    })
  })

  router.post('/', function(req, res) {
    var newTimeline = new Timeline(req.body);
    newTimeline.save(function(err, timeline){
      if (err) return console.log(err);
      res.send('timeline saved');
    })
  })


}