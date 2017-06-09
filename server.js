// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var config     = require('./config');
var mongoose   = require('mongoose');
mongoose.Promise = global.Promise;

// Connect to db
mongoose.connect(config.db.uri);

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// REQUIRE ROUTES
router.use('/breweries', require ('./api/routes/brewery'));
router.use('/beers', require ('./api/routes/beer'));
router.use('/styles', require ('./api/routes/style'));
router.use('/news', require ('./api/routes/news'));

// REGISTER OUR ROUTES -------------------------------
// all routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);
