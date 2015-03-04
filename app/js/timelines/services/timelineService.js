
module.exports = function(app) {
  app.service('TimelineService', ['$http', function($http) {

  //timeline functions
    this.timelines = (function() {
      var timelines = {};
      $http.get('/api/timelines').success(function(data) {
        data.forEach(function(item) {
          timelines[item._id] = item;
        });
      });
      return timelines;
    }());

    this.save = function(timeline) {
      timeline = {
        name: timeline.name,
        ev: [],
        type: 'public',
        color: timeline.color
      };
      $http.post('/api/timelines', timeline).success((function(data) {
        this.timelines[data._id] = data;
      }).bind(this));
    };

    this.deleteTimeline = function(timeline) {
      var url = 'api/timelines/' + timeline._id;
      $http.delete('/api/timelines/' + timeline._id)
        .success((function(data) {
          delete this.timelines[timeline._id];
        }).bind(this));
    };

  //event functions
    this.addEvent = function(timelineId, event) {
        ev = {
          timelineId: timelineId,
          name: event.name,
          start: event.start,
          end: event.end
        };
        $http.post('/api/events/new_event', ev).success((function(data) {
          this.timelines[data.timelineId].ev.push(data);
        }).bind(this));
      };

    this.removeEvent = function(event, line) {
      $http.delete('/api/events/' + event._id)
        .success(function(data) {
          line.ev = data.events;
        });

    };

  }]);
};
