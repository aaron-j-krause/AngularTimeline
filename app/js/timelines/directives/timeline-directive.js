'use strict'

module.exports = function(app) {
  app.directive('timelineDirective', function() {
    return {
      restrict: 'A',
      templateUrl: './templates/timelines/directives/timeline-directive-template.html',
      replace: true
    }
  })
}