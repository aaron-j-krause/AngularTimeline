require('angular/angular');

var app = angular.module('myapp', []);

//services
require('./timelines/services/timelineService')(app);

//controllers
require('./timelines/controllers/timelineController')(app);
