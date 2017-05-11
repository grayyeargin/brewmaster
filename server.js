// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var config     = require('./config');
var mongoose   = require('mongoose');

// Connect to db
mongoose.connect(config.db.uri);

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// REQUIRE ROUTES
router.use('/brewery', require ('./api/routes/brewery'));

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);