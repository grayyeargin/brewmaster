const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config = require('../../config');

const User = require('../models/user')

// ALL USERS
router.get('/', function (req, res) {
	User.find(req.query)
		.exec(function(err, users) {
			if (err) res.json(err)
			res.json(users)
		})
})

// SINGLE
router.get('/:user_id', function (req, res) {
  User.findOne({ _id: req.params.user_id})
    .exec(function(err, results) {
      if (err) res.json(err)
      res.json(results)
    })
})


// User authentication
router.post('/authenticate', function (req, res) {
	User.findOne({'username': req.body.username}, function(err, user){
		if (!user) {
      res.json({success: false, response: err})
    } else {
  		bcrypt.compare(req.body.password, user.password, function(err, response) {
      	if (response) {
      		var token = jwt.sign(user, config.secret, {
            expiresIn: 1440 // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({
            success: true,
            response: 'Successful signin',
            access_token: token,
            user: user
          });
      	}
  		});
    }
	})
})

module.exports = router
