const express = require('express');
const router = express.Router();

// BREWERY MODEL
const Style = require('../models/style')

// ALL
router.get('/', function (req, res) {
	Style.find(req.query)
		.exec(function(err, styles) {
			if (err) res.json(err)
			res.json(styles)
		})
})


// SINGLE
router.get('/:style_id', function (req, res) {
	Style.findOne({ _id: req.params.style_id }, function(err, results) {
		if (err) res.json(err)
		res.json(results)
	})
})


// CREATE
router.post('/', function (req, res) {
	Style.create({

	}, function (err, result) {
		if (err) res.json(err)
		res.send(201)
	})
})


// UPDATE
router.put('/:style_id', function (req, res) {
	Style.findOneAndUpdate({ _id: req.params.style_id }, req.query, function(err, result){
		if (err) res.json(err)
		res.json(result)
	})
})


// DELETE
router.delete('/:style_id', function (req, res) {
	Style.deleteOne({ _id: req.params.style_id }, function(err, results) {
		if (err) res.json(err)
		res.send(201)
	})
})

module.exports = router
