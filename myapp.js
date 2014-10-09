var app = angular.module('myapp', ['ngRoute']);

app.service('TimelineService', function(){
	var id = 1;
	var timelines = {};

	this.save = function(timeline){
		timelines[timeline.name] = timeline;
		timelines[timeline.name].type = "public";
		timelines[timeline.name].ev = {};
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
		timelines[timeline.name].ev[timeline.temp.name] = {
								name: timeline.temp.name,
								start: timeline.temp.start,
								end: timeline.temp.end
							}
	}
	this.removeEvent = function(line, e){
		//console.log(eventname);
		//console.log(line);
		delete line.ev[e.name]
		//console.log(line);
	}
})
app.controller('TimelineController', function($scope, TimelineService){
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
		//console.log(line.ev.name.start);
		TimelineService.addEvent(line);
		//console.log(name);
		line.temp = {};
		//line.ev.name.start="";
		//line.ev.name.end="";
		//console.log(line.ev);
		
	}
	this.remove = function(line, e){
		TimelineService.removeEvent(line, e);
		console.log(line.ev[e.name]);
		console.log(line.ev);
	}
	this.log = function(){
		console.log(this.lines);
		console.log(this.vis);
	}
	this.pub = function(){
		this.vis.pub = !this.vis.pub;
	}
	this.priv = function(){
		this.vis.priv = !this.vis.priv;
	}
	this.isVis = function(line){
		if((line.type == "public" && this.vis.pub)||(line.type == "private" && this.vis.priv)){
			return true
		}

	}
})

