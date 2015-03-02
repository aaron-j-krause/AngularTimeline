var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var assignTimelineRoutes = require('./routes/timelineRoutes');

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//router
var timelineRouter = express.Router();

assignTimelineRoutes(timelineRouter);

app.use('/api/timelines', timelineRouter);

//db
mongoose.connect('mongodb://localhost/dev_db');

app.listen(3000, function(){
  console.log('server listening on port 3000')
})