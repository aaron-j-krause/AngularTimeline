
module.exports = function(app) {
  app.controller('timelineController', ['$scope', 'TimelineService', '$http',
      function($scope, TimelineService, $http) {
    $scope.bgcolor = [['#ff3030', '#CC2626'], ['#32CD32', '#238F23'],
      ['#00F5FF', '#00ABB2'], ['#ffd700', '#CCAC00']];
    $scope.timeline = {};
    $scope.vis = {
      priv: true,
      pub: true
    };

    $scope.lines = TimelineService.timelines;

    $scope.deleteTimeline = function(timeline) {
      TimelineService.deleteTimeline(timeline);

    };

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
      if ((line.type == 'public' && $scope.vis.pub) ||
          (line.type == 'private' && $scope.vis.priv)) {
        return true;
      }
    };
  }]);
};
