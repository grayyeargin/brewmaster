var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	res.json({ message: 'breweries!' });
})

router.get('/:brewery_id', function (req, res) {
	
})

router.post('/brewery', function (req, res) {
	
})

router.put('/brewery', function (req, res) {
	
})

router.delete('/brewery/:brewery_id', function (req, res) {
	
})

module.exports = router