var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var assignTimelineRoutes = require('./routes/timelineRoutes');
var assignEventRoutes = require('./routes/eventRoutes');

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/build'));

//router
var timelineRouter = express.Router();
var eventRouter = express.Router();

assignTimelineRoutes(timelineRouter);
assignEventRoutes(eventRouter);

app.use('/api/timelines', timelineRouter);
app.use('/api/events', eventRouter);

//db
mongoose.connect('mongodb://localhost/dev_db');

app.listen(3000, function() {
  console.log('server listening on port 3000');
});
