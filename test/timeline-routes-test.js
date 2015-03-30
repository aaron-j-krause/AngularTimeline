'use strict';

process.env.TEST_MODE = true; //disables morgan for testing
process.env.MONGO_URI = 'mongodb://localhost/test_db';
require('../server');

var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var mongoose = require('mongoose');
var id;
describe('Timeline routes', function() {
  beforeEach(function(done) {
    chai.request('localhost:3000')
      .post('/api/timelines/')
      .send({name: 'another-testline', ev: [], color: ['red', 'red']})
      .end(function(err, res) {
        id = res.body._id;
        done();
      });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should get a list of timelines', function(done) {
    chai.request('localhost:3000')
      .get('/api/timelines/')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.eql(true);
        expect(res.body[0]).to.have.property('color');
        done();
      });
  });

  it('should create a timeline', function(done) {
    chai.request('localhost:3000')
      .post('/api/timelines/')
      .send({name: 'testline', ev: [], color: ['blue', 'blue']})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('testline');
        expect(res.body.color).to.contain('blue');
        done();
      });
  });

  it('should delete a timeline', function(done) {
    chai.request('localhost:3000')
      .delete('/api/timelines/' + id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('timeline deleted');
        done();
      });
  });

});
