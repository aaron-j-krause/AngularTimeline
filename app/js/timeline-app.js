require('angular/angular');
require('angular-route');

var app = angular.module('timelineApp', []);

//services
require('./timelines/services/timelineService')(app);

//controllers
require('./timelines/controllers/timelineController')(app);


