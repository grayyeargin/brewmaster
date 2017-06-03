var request = require("request"),
  cheerio = require("cheerio"),
  url;

var config     = require('./config');

var mongoose   = require('mongoose');
mongoose.Promise = global.Promise;

// Connect to db
mongoose.connect(config.db.uri);

// BREWERY MODEL
const Brewery = require('./api/models/brewery')
const Beer = require('./api/models/beer')

var $, // Requested pages DOM
    url;

request('https://www.ratebeer.com/breweries/', function(err, response, body) {
	if (!err) {
		$ = cheerio.load(body);
		var states = $('.col-xs-12.col-sm-12.col-md-12.col-lg-12.col-xl-12 #default a').slice(0,51),
				stateLinks = states.map(function(i, state){  return state.attribs.href })
			
			// for (var i = 0; i < stateLinks.length; i++) {
			for (var i = 0; i < stateLinks.length; i++) {
				request('https://www.ratebeer.com' + stateLinks[i], function (err, response, body) {
					if (!err) {
	  				$ = cheerio.load(body);
	  				var breweries = $('table.tablesorter').first().find('tr'),
	  				brewObjs = [] 

	  				breweries.each(function(i, brewery){
	  					var brewNum = $(this).find('td:nth-child(3)').text().trim(),
	  							brewLink = $(this).find('td:nth-child(1) a').attr('href')

	  					if (brewNum > 10 && brewLink) {
	  						request('https://www.ratebeer.com' + brewLink, function (error, response, body) {
					  			if (!error) {
					  				$ = cheerio.load(body);
					  				var breweryName = $('h1').html(),
					  						streetAddress = $('span[itemprop="address"] a').text().trim(),
									      phone = $('span[itemprop="telephone"] a').html(),
									      state = $('span[itemprop="addressRegion"]').html(),
									      country = $('span[itemprop="addressCountry"]').html(),
									      beerRows = $('#brewer-beer-table tr');
									  if (breweryName != '') {
										  Brewery.findOne({ 'name': breweryName}).select('name').exec()
										  .then(function(brewery) {
										  	if (!brewery && breweryName && beerRows.length > 10) {
										  		console.log("SUCCESS:  " + breweryName)
									      	Brewery.create({
									      		name: breweryName,
									      		address: streetAddress,
									      		phone: phone,
									      		state: state,
									      		country: country
													}, function (err, result) {
														if (err) console.log("Error saving " + breweryName)
													}).then(function() {
														getBeers(beerRows);
													})
										  	} else {
										  		console.log('Beer length: ' + beerRows.length + '  breweryName: ' + breweryName)
										  		getBeers(beerRows);
										  	}
										  })
										}

					  			} else {
					  				console.log("We’ve encountered an error: " + breweryName);
					  			}
					  		});
	  					}


	  				})

	  				

	  				
	  			}
				})


			} // End of for loop

	}

})
    

// for (var i = 0; i < arr.length; i++) {
// 	var brewTitle = arr[i]
// 	url = 'https://www.ratebeer.com/findbeer.asp?beername='+ brewTitle.replace(' ', '+');
// 	request(url, function (error, response, body) {
// 	  if (!error) {
// 	  	$ = cheerio.load(body);
// 	  	var breweryLink = $('.table-striped tr td a').attr('href')
	  	
// 	  	if (breweryLink != '' && breweryLink.includes('brewers')) {
// 	  		request('https://www.ratebeer.com' + breweryLink, function (error, response, body) {
// 	  			if (!error) {
// 	  				$ = cheerio.load(body);
// 	  				var breweryName = $('h1').html(),
// 	  						streetAddress = $('span[itemprop="address"] a').text().trim(),
// 					      phone = $('span[itemprop="telephone"] a').html(),
// 					      state = $('span[itemprop="addressRegion"]').html(),
// 					      country = $('span[itemprop="addressCountry"]').html();

// 					  if (breweryName != '') {
// 						  Brewery.findOne({ 'name': breweryName}).select('name').exec()
// 						  .then(function(brewery) {
// 						  	if (!brewery) {
// 						  		console.log("SUCCESS:  " + breweryName)
// 					      	Brewery.create({
// 					      		name: breweryName,
// 					      		address: streetAddress,
// 					      		phone: phone,
// 					      		state: state,
// 					      		country: country
// 									}, function (err, result) {
// 										if (err) console.log("Error saving " + breweryName)
// 									})
// 						  	}
// 						  })
// 						}

// 	  			} else {
// 	  				console.log("We’ve encountered an error: " + breweryLink);
// 	  			}
// 	  		});
// 	  	}
	  
// 	  } else {
// 	    console.log("We’ve encountered an error: " + brewTitle);
// 	  }
// 	});
	
// }

var getBeers = function(beerRows) {
	var beerObjs = []


	beerRows.each(function(i, beer){
		var link = $(this).find('a').first().attr('href'),
				ratings = $(this).find('td:nth-of-type(7)').text()
		if (ratings > 2) {
			beerObjs.push({
				num: ratings,
				link: link
			})
		}
	})

	beerObjs.sort(function(a,b){
		return b.num - a.num
	})

	beerObjs = beerObjs.slice(0,8)

	for (var beer of beerObjs) {
		request('https://www.ratebeer.com' + beer.link, function (error, response, body) {
			if (!error) {
				var $ = cheerio.load(body);


				var name = $('h1').text().trim(),
					breweryName = $('a#_brand4 span').text().trim(),
					abv = $(".stats-container big:nth-of-type(3)").text().trim(),
					ibu = $(".stats-container big:nth-of-type(1)").text().trim(),
					calories = $(".stats-container big:nth-of-type(2)").text().trim(),
					description = $('.commercial-description-container span').text().trim(),
					styleName = $("#container > div.row.columns-container > div.col-sm-8 > div.reduced-border-spacing > div > div.description-box.col-sm-10 > div:nth-child(1) > a:nth-child(3)").text().trim();

				if (!breweryName) {
					debugger;
				}
				
				Brewery.findOne({ 'name': breweryName}).exec()
				.then(function(brewery) {
					console.log(brewery)
					Beer.findOne({ 'name': name}).exec()
						.then(function(beer){
							if (brewery && name && !beer) {
								Beer.create({
				      		name: name,
				      		abv: abv,
				      		ibu: parseInt(ibu),
				      		calories: parseInt(calories),
				      		description: description,
				      		styleName: styleName,
				      		_brewery: brewery.id
								}, function (err, result) {
									if (err) {
										console.log("Error saving " + name) 
									} else {
										brewery.beers.push(result.id)
										brewery.save();
									}
								})
							}
					})
				})
			}
		})
	}

}
