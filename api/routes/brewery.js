const express = require('express');
const router = express.Router();

// BREWERY MODEL
const Brewery = require('../models/brewery')

// ALL
router.get('/', function (req, res) {
	Brewery.find(req.query)
		// .deepPopulate(['beers.style'])
		.exec(function(err, breweries) {
			if (err) res.json(err)
			res.json(breweries)
		})
})


// SINGLE
router.get('/:brewery_id', function (req, res) {
	Brewery.findOne({ _id: req.params.brewery_id })
		// .deepPopulate('beers.style')
		.exec(function(err, results) {
			if (err) res.json(err)
			res.json(results)
		})
})


// CREATE
router.post('/', function (req, res) {
	Brewery.create({

	}, function (err, result) {
		if (err) res.json(err)
		res.send(201)
	})
})


// UPDATE
router.put('/:brewery_id', function (req, res) {
	Brewery.findOneAndUpdate({ _id: req.params.brewery_id }, {
		
	})
})


// DELETE
router.delete('/:brewery_id', function (req, res) {
	Brewery.deleteOne({ _id: req.params.brewery_id }, function(err, results) {
		if (err) res.json(err)
		res.send(201)
	})
})


module.exports = router
