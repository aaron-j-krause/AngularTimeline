 var ngapp = angular.module('myapp', ['ngRoute']);

//Timeline and Event add and remove functions. Timeline master Object
ngapp.service('TimelineService', ['$http', function($http) {


//timeline functions
  this.save = function(timeline) {
    timeline = {
      name: timeline.name,
      ev: [],
      type: 'public',
      color: timeline.color
    };
    $http.post('/api/tl', timeline).success(function(data,status){
      console.log('POST status:',status)
    })
  };

  this.list = function() {
    return timelines;
  };

  this.deleteTimeline = function(timeline){
    var url = 'api/tl/' + timeline._id;
    console.log(url);
    $http.delete('/api/tl/' + timeline._id)
  }

//event functions
  this.addEvent = function(timeline, event) { 
      ev = {
        timeline_id: timeline._id,
        name: event.name,
        start: event.start,
        end: event.end
      };
      $http.post('/api/ev', ev).success(function(data){
        console.log(data)
        console.log(data.timeline_id)
        console.log('event update')
        //timelines[timeline._id].ev[data._id] = data
      })
    };

  this.removeEvent = function(line, event) {
    //delete line.ev[e._id];
    $http.delete('/api/ev/' + event._id)
      .success(function(data){
        console.log(data)
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

  $scope.setList = function(){
    var timelines = {};
    $http.get('/api/tl').success(function(data,status,headers,config){
      data.forEach(function(item){
        if(item._id){
          timelines[item._id] = item;
        }
      })
    });
    return timelines;
  };

  $scope.lines = $scope.setList();

  $scope.deleteTimeline = function(timeline){
    TimelineService.deleteTimeline(timeline);
    $scope.lines = $scope.setList();
  }
  
  
  $scope.addTimeline = function(timeline) {
    timeline.color = $scope.bgcolor[Math.floor(Math.random() * 4)];
    //console.log(timeline);
    TimelineService.save(timeline);
    $scope.timeline = {};
    $scope.lines = $scope.setList();
  };

  $scope.addEvent = function(line, event) {
    TimelineService.addEvent(line, event);
    $scope.event = {};
    $scope.lines = $scope.setList();
  };

  $scope.getEvents = function(line){
    var events = {};
    $http.get('api/tl').success(function(data,status){
      data.forEach(function(item){
        if(item._id == line._id){
          events[item._id] = item;
        }
      })
    })
    return events;
  }

  $scope.deleteEvent = function(line, event) {
    TimelineService.removeEvent(line, event);
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
