/*
 * REST apis for car devices
 */
var router = module.exports = require('express').Router();
var moment = require('moment');

var driverInsightsAnalyze = require('../../driverInsights/analyze');
var debug = require('debug')('jobs');
debug.log = console.log.bind(console);
var dashdbHelper = require("../../dashDB/dashdbHelper");
var dashDBClient = require('../../dashDB');
var scoring = {};
var fs = require('fs')

var http = require('http');

/* update json api*/
router.post('/updatejson', /*authenticate, */function(req,res) {
  console.log("-------------routes/updatejson--------------------");
  console.log(req.body);
 if(req.body)
 {
 		res.status(200).json({"message": "success"});
 		console.log(req.body);
 }

var readdata = fs.readFileSync('./driverInsights/mapping/car_driver_mapping.json');
  var words = JSON.parse(readdata);
  var word = req.body.deviceId;
 var score = req.body.username;
  words[word] = score;
  var newdata = JSON.stringify(words);
 fs.writeFile('./driverInsights/mapping/car_driver_mapping.json',newdata); 
});




//./driverInsights/mapping/users.json