var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var app = express();


//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))

//db
mongoose.connect('mongodb://localhost/dev_db');


app.listen(3000, function(){
  console.log('server listening on port 3000')
})