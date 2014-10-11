var app = angular.module('myapp', ['ngRoute']);

//Timeline and Event add and remove functions. Timeline master Object
app.service('TimelineService', function() {
  var timelines = {};

//timeline functions
  this.save = (function() {
    var lineId = 1;
    return function(timeline) {
      timeline = {
        type: 'public',
        ev: {},
        id: lineId,
        name: timeline.name,
        color: timeline.color
      };
      timelines[timeline.id] = timeline;
      lineId++;
    };
  }());

  this.list = function() {
    return timelines;
  };

//event functions
  this.addEvent = (function() {
    var evId = 1;
    return function(timeline) {
      timelines[timeline.id].ev[evId] = {
        name: timeline.temp.name,
        start: timeline.temp.start,
        end: timeline.temp.end,
        id: evId
      };
      evId++;
    };
  }());

  this.removeEvent = function(line, e) {
    delete line.ev[e.id];
  };
});

app.controller('TimelineController', ['$scope', 'TimelineService', function($scope, TimelineService) {
  $scope.bgcolor = [['#ff3030', '#CC2626'], ['#32CD32', '#238F23'], ['#00F5FF', '#00ABB2'], ['#ffd700', '#CCAC00']];
  $scope.timeline = {};
  $scope.vis = {
    priv: true,
    pub: true
  };

  $scope.lines = TimelineService.list();
  $scope.addTimeline = function() {
    $scope.timeline.color = $scope.bgcolor[Math.floor(Math.random() * 4)];
    TimelineService.save($scope.timeline);
    $scope.timeline = {};
  };

  $scope.addEvent = function(line, name, start, end) {
    //console.log(line, name, start, end);
    TimelineService.addEvent(line);
    line.temp = {};
  };

  $scope.deleteEvent = function(line, e) {
    TimelineService.removeEvent(line, e);
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
