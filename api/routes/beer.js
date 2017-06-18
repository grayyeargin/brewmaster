const express = require('express');
const router = express.Router();

// BREWERY MODEL
const Beer = require('../models/beer')

// ALL
router.get('/', function (req, res) {
	let queryObj = {};
		// Conditionally add query parameters
		if (req.query.style) queryObj.style = req.query.style;

	let q = Beer.find(queryObj)
		// .populate('_brewery', 'name').populate('style', 'name')
		
		if (req.query.limit) q = q.limit(parseInt(req.query.limit));

		q.exec(function(err, beers) {
			if (err) return res.json(err)
			res.json(beers)
		})
})


// SINGLE
router.get('/:beer_id', function (req, res) {
	Beer.findOne({ _id: req.params.beer_id})
		// .populate('_brewery', 'name')
		// .populate('style', 'name')
		.exec(function(err, results) {
			if (err) res.json(err)
			res.json(results)
		})
})


// CREATE
router.post('/', function (req, res) {
	Beer.create({

	}, function (err, result) {
		if (err) res.json(err)
		res.send(201)
	})
})


// UPDATE
router.put('/:beer_id', function (req, res) {
	Beer.findOneAndUpdate({ _id: req.params.beer_id }, {
		
	})
})


// DELETE
router.delete('/:beer_id', function (req, res) {
	Beer.deleteOne({ _id: req.params.beer_id }, function(err, results) {
		if (err) res.json(err)
		res.send(201)
	})
})

module.exports = router