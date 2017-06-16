const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config = require('../../config');

const User = require('../models/user')

router.get('/', function (req, res) {
	User.find(req.query)
		.exec(function(err, users) {
			if (err) res.json(err)
			res.json(users)
		})
})


// User authentication
router.post('/authenticate', function (req, res) {
	User.findOne({username: req.body.username}, function(err, user){
		if (err) res.json(err)
		bcrypt.compare(req.body.password, user.password, function(err, response) {
    	if (response) {
    		var token = jwt.sign(user, config.secret, {
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
    	}
		});
	})
})

module.exports = router
