require('angular/angular');
require('angular-route');

var app = angular.module('timelineApp', ['ngRoute']);

//services
require('./timelines/services/timelineService')(app);

//controllers
require('./timelines/controllers/timelineController')(app);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'barf.html'
  })
  .when('/', {
    redirectTo: '/home'
  })
  .when('/signin', {
    templateUrl: './templates/sign-in.html',
    controller: 'timelineController'
  })
}])

