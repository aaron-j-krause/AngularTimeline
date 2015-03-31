require('angular/angular');
require('angular-route');

var timelineApp = angular.module('timelineApp', ['ngRoute']);
//services
require('./timelines/services/timelineService')(timelineApp);

//controllers
require('./timelines/controllers/timelineController')(timelineApp);

timelineApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'templates/home.html'
  })
  .when('/', {
    redirectTo: '/home'
  })
  .when('/signin', {
    templateUrl: 'templates/sign-in.html'
  });
}]);
