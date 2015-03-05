process.env.MONGO_URI = 'mongodb://localhost/test_db';
require('../server');


var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var mongoose = require('mongoose');

describe('Timeline routes', function(){

  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      done();
    })
  })
  it('should create a timeline', function(done){
    chai.request('localhost:3000')
      .post('/api/timelines/')
      .send({name: 'testline', ev: [], color: ['blue', 'blue']})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('testline');
        expect(res.body.color).to.contain('blue');
        done();
      })
  });
});