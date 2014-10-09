var app = angular.module('myapp', ['ngRoute']);



//Timeline and Event add and remove functions. Timeline master Object
app.service('TimelineService', function(){
	var id = 1;
	var evid = 1;
	var timelines = {};

	this.save = function(timeline){
		timeline = {
			type: "public",
			ev: {},
			id: id,
			name: timeline.name,
			color: timeline.color
		}
		timelines[timeline.id] = timeline;
		id++;
		//timelines[timeline.id].type = "public";
		//timelines[timeline.id].ev = {};
	}
	this.list = function(){
		return timelines;
	}

	this.find = function(name){
		if(name in timelines){
			return timelines.name;
		}
	}
	this.addEvent = function(timeline){
		timelines[timeline.id].ev[evid] = {
								name: timeline.temp.name,
								start: timeline.temp.start,
								end: timeline.temp.end,
								id: evid
							}
	evid++;
	}
	this.removeEvent = function(line, e){
		//console.log(eventname);
		//console.log(line);
		delete line.ev[e.name]
		//console.log(line);
	}
})

app.controller('TimelineController', ['$scope', 'TimelineService', function($scope, TimelineService){
	this.bgcolor = [['#ff3030','#CC2626'],['#32CD32','#238F23'],['#00F5FF','#00ABB2'],['#ffd700','#CCAC00']];
	this.timeline = {};
	this.vis = {
		priv: true,
		pub: true
	}
	this.lines = TimelineService.list();
	this.addTimeline = function(){
		this.timeline.color = this.bgcolor[Math.floor(Math.random() * 4)];
		TimelineService.save(this.timeline);
		//console.log(this.timeline);
		this.timeline = {};
	}
	this.findTimeline = function(name){

		console.log(TimelineService.find(name));

	}
	this.addEvent = function(line, name, start, end){
		console.log(line, name, start, end);
		TimelineService.addEvent(line);
		line.temp = {};

		
	}
	this.remove = function(line, e){
		TimelineService.removeEvent(line, e);
		console.log(line.ev[e.name]);
		console.log(line.ev);
	}
	this.log = function(){
		console.log(this.lines);
		//console.log(this.vis);
		//console.log($scope.timelineCtrl.vis);
	}

	this.isVis = function(line){
		if((line.type == "public" && this.vis.pub)||(line.type == "private" && this.vis.priv)){
			return true
		}

	}
}])

