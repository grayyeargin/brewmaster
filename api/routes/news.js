const express = require('express');
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");

// BREWERY NEWS
router.get('/', function (req, res) {
	request('http://beerpulse.com/', function(err, response, body) {
		if (!err) {
			let $ = cheerio.load(body),
				articleArr = $('article').slice(0,3),
				responseArr = []


				articleArr.each(function(i, article){
					responseArr.push({
						imgSrc: $(this).find('img').attr('src'),
						link: $(this).find('.excerpt-title a').attr('href'),
						title: $(this).find('.excerpt-title').text().trim(),
						description: $(this).find('.entry-summary').text().trim().split('..')[0]
					})
				})

			res.json(responseArr);
		} else {
			res.send(201)
		}
	})
})

module.exports = router
