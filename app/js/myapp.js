require('angular/angular');
require('angular-route');

var app = angular.module('timelineApp', []);

//services
require('./timelines/services/timelineService')(app);

//controllers
require('./timelines/controllers/timelineController')(app);

timelineApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'index.html'
  })
  .when('/', function() {
    redirectTo: '/home'
  })
}])


