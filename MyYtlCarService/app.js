var express = require('express');
var bodyParser = require('body-parser');

// *** load environment variables *** //
require('dotenv').config();

//Get port from environment and store in Express.
var port = process.env.VCAP_APP_PORT || 1000;

var app = express();
//set the app object to export so it can be required 
module.exports = app;

//var port = process.env.PORT || 1000;
app.set('port', port);

app.use(bodyParser.json());

//add routes
app.use('/driverinsights/jobcontrol',       require('./routes/jobs'));
app.use('/generic' , require('./routes/generic')); 

//app.use('/websocket', require('./routes/websocket'));

// start server on the specified port and binding host
app.listen(port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + port);
});