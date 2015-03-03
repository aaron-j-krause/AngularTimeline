require('angular/angular')


 var ngapp = angular.module('myapp', []);

//Timeline and Event add and remove functions. Timeline master Object
ngapp.service('TimelineService', ['$http', function($http) {

//timeline functions

  this.timelines = (function() {
    var timelines = {};
    $http.get('/api/timelines').success(function(data) {
      data.forEach(function(item) {
        timelines[item._id] = item;
      })
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
      this.timelines[data._id] = data
    }).bind(this))
  };


  this.deleteTimeline = function(timeline) {
    var url = 'api/timelines/' + timeline._id;
    $http.delete('/api/timelines/' + timeline._id)
      .success((function(data) {
        delete this.timelines[timeline._id]
      }).bind(this))
  }

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
      }).bind(this))
    };

  this.removeEvent = function(event, line) {
    $http.delete('/api/events/' + event._id)
      .success(function(data) {
        line.ev = data.events;
      })

  };

}]);

ngapp.controller('TimelineController', ['$scope', 'TimelineService', '$http', function($scope, TimelineService, $http) {
  $scope.bgcolor = [['#ff3030', '#CC2626'], ['#32CD32', '#238F23'], ['#00F5FF', '#00ABB2'], ['#ffd700', '#CCAC00']];
  $scope.timeline = {};
  $scope.vis = {
    priv: true,
    pub: true
  };

  $scope.lines = TimelineService.timelines;

  $scope.deleteTimeline = function(timeline) {
    TimelineService.deleteTimeline(timeline);

  }
  
  $scope.addTimeline = function(timeline) {
    timeline.color = $scope.bgcolor[Math.floor(Math.random() * 4)];
    TimelineService.save(timeline);
    $scope.timeline = {};
  };

  $scope.addEvent = function(event, line) {
    TimelineService.addEvent(line._id, event);
    line.tempEvent = {};
  };

  $scope.deleteEvent = function(event, line) {
    TimelineService.removeEvent(event, line);
  };

  $scope.log = function() {
    console.log($scope.lines);
  };

  $scope.isVis = function(line) {
    if ((line.type == 'public' && $scope.vis.pub) || (line.type == 'private' && $scope.vis.priv)) {
      return true;
    }
  };
}]);
