// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
// var express    = require('express');        // call express
import express from 'express';
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var fs         = require('fs');

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
router.route('/lights')

// create a bear (accessed at POST http://localhost:8080/api/bears)
  .post(function(req, res) {

  })

  // get all the bears (accessed at GET http://localhost:8080/api/bears)
  .get(function(req, res) {
      // res.setHeader('Content-Type', 'application/json');
      res.json(config);
  });

router.route('/lights/:light_id')

// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
  .get(function(req, res) {
      var light_id = req.params.light_id;
      if(!config[light_id]) {
          res.json({error: 'Light ' + light_id + ' not found'});
      }
      res.json(config[light_id]);
  })

  // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
  .put(function(req, res) {
      var light_id = req.params.light_id;

      if(!config[light_id]) {
        res.json({error: 'Light ' + light_id + ' not found'});
      }

      if(req.body.on) {
          config[light_id]['state']['on'] = req.body.on;
          // res.json({ message: 'Light ' + light_id + ' updated!' });
          res.json(config[light_id]);
      }
  });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('HUE backend on port ' + port);
