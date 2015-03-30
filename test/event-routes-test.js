'use strict';

process.env.TEST_MODE = true; //disables morgan for testing
process.env.MONGO_URI = 'mongodb://localhost/test_db';
require('../server');

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var mongoose = require('mongoose');

describe('Event route tests', function() {
  var timelineId;
  var eventId;
  var testEvent;

  before(function(done) {
    chai.request('localhost:3000')
      .post('/api/timelines/')
      .send({name: 'test-line', ev:[], color:['red', 'red']})
      .end(function(err, res) {
        timelineId = res.body._id;
        chai.request('localhost:3000')
          .post('/api/events/new_event')
          .send({name:'test-event', start: 2, end: 5, timelineId: timelineId})
          .end(function(err, res) {
            testEvent = res.body;
            done();
          });
      });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should create an event', function(done) {
    chai.request('localhost:3000')
      .post('/api/events/new_event')
      .send({name: 'another-test-event', start: 6, end: 8, timelineId: timelineId})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('another-test-event');
        expect(res.body._id).to.exist;
        done();
      });
  });

  it('should delete an event', function(done) {
    chai.request('localhost:3000')
      .delete('/api/events/' + testEvent._id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.events).to.not.contain(testEvent);
        done();
      });
  });
});
