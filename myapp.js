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
  this.bgcolor = [['#ff3030', '#CC2626'], ['#32CD32', '#238F23'], ['#00F5FF', '#00ABB2'], ['#ffd700', '#CCAC00']];
  this.timeline = {};
  this.vis = {
    priv: true,
    pub: true
  };

  this.lines = TimelineService.list();
  this.addTimeline = function() {
    this.timeline.color = this.bgcolor[Math.floor(Math.random() * 4)];
    TimelineService.save(this.timeline);
    this.timeline = {};
  };

  this.addEvent = function(line, name, start, end) {
    //console.log(line, name, start, end);
    TimelineService.addEvent(line);
    line.temp = {};
  };

  this.deleteEvent = function(line, e) {
    TimelineService.removeEvent(line, e);
  };

  this.log = function() {
    console.log(this.lines);
  };

  this.isVis = function(line) {
    if ((line.type == 'public' && this.vis.pub) || (line.type == 'private' && this.vis.priv)) {
      return true;
    }
  };
}]);
