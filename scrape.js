var request = require("request"),
  cheerio = require("cheerio"),
  url,
  iconv = require('iconv-lite');

var config     = require('./config');

var mongoose   = require('mongoose');
mongoose.Promise = global.Promise;

// Connect to db
mongoose.connect(config.db.uri);

// BREWERY MODEL
const Brewery = require('./api/models/brewery')
const Beer = require('./api/models/beer')
const Style = require('./api/models/style')
const User = require('./api/models/user')

var $, // Requested pages DOM
    url;


// Style.find({}).exec(function(err, styles){
// 	for (let style of styles) {
// 		Beer.find({styleName: style.name}).exec(function(err, beers) {
// 			if (!err) {
// 				for (let beer of beers) {
// 					beer.style = style._id
// 					beer.save()
// 					// if (!style.beers) {
// 					// 	style.beers = []
// 					// }
// 					style.beers.push(beer._id)
// 					style.save()
// 				}
// 			} else {
// 				console.log('Error for ' + style.name + ' ' + err)
// 			}
// 		})
// 	}
// })





/* 
 *
 * STYLE SCRAPE
 *
 */
// request({uri: 'https://www.ratebeer.com/beerstyles/', encoding: null}, function(err, res, body){
// 	if (!err) {
// 		$ = cheerio.load(iconv.decode(body, 'iso-8859-1')),
// 		styleLinks = $('.col-xl-offset-2.col-lg-8 .col-lg-4 a')

// 		styleLinks.each(function(i, style){
// 			// let link = $(this).attr('href');
// 			let styleName = $(this).text().trim();

// 			if (typeof styleName != 'undefined') {
// 				// requestStylePage(link)
// 				Style.create({
// 					name: styleName
// 				}, function(err, result) {
// 					if (err) {
// 						console.log(err)
// 					} else {
// 						console.log('SUCCESS: ' + result.name)
// 					}
// 				})
// 			} else {
// 				console.log('No link provided for ' + $(this))
// 			}
// 		})
// 	}
// })

// function requestStylePage(href) {
// 	request({ uri: 'https://www.ratebeer.com' + href, encoding: null }, function(err, res, body) {
// 		let $ = cheerio.load(iconv.decode(body, 'iso-8859-1')),
// 			title = $('h1').text().trim(),
// 			description = $('h1').next().text().trim();
// 			debugger;
// 			if (title && description) {
// 				Style.create({
// 					name: title,
// 					description: description
// 				}, function(err, result) {
// 					if (err) {
// 						console.log(err)
// 					} else {
// 						console.log('SUCCESS: ' + result.name)
// 					}
// 				})
// 			} else {
// 				console.log('ERROR: no title or description for ' + href)
// 			}
// 	})
// }





// Brewery.remove({name: "503 Service Temporarily Unavailable"}, function(err, result){
// 	if (err) {
// 		console.log(err)
// 	} else {
// 		console.log(result)
// 	}
// })

// Brewery.where('beers').size(0)
// Brewery.find({state: 'Vermont'}).where('beers').size(0)
// 		.exec(function(err, breweries) {
// 			if (!err) {
// 				for (let brewery of breweries) {
// 					console.log(brewery.name)
// 					request('https://www.ratebeer.com/findbeer.asp?beername='+brewery.name.replace(' ', '+'), function(err, response, body) {
// 						if (!err) {
// 							$ = cheerio.load(body),
// 								brewUrl = $('.table-striped tr a').attr('href'),
// 								brewID = brewUrl ? brewUrl.split('/').slice(-2)[0] : '';
// 								console.log(brewID)
// 								request('https://www.ratebeer.com/Ratings/Beer/ShowBrewerBeers.asp?BrewerID=' + brewID, function(err, response, body) {
// 									if (!err) {
// 										$ = cheerio.load(body),
// 											rows = $('#brewer-beer-table tbody tr');
// 											console.log(rows.length)
// 											getBeers(rows);
// 										} else {
// 											console.log('Error loading brewery beer list: ' + err)
// 										}
// 								})

// 							} else {
// 								console.log('Error on jeeves: ' + err)
// 							}
// 					})
// 				}
// 			} else {
// 				console.log(err);
// 			}
// })


// request('http://www.ask.com/web?o=0&l=dir&qo=serpSearchTopBox&q=brewers+ratebeer+'+brewery.name.replace(' ', '+'), function(err, response, body) {
// 	if (!err) {
// 		let $ = cheerio.load(body),
// 			brewLink = $('.PartialSearchResults-item-title-link').attr('href');
// 		} else {
// 			console.log('Error on jeeves: ' + err)
// 		}
// })

// request('https://www.ratebeer.com/breweries/', function(err, response, body) {
// 	if (!err) {
// 		$ = cheerio.load(body);
// 		var states = $('.col-xs-12.col-sm-12.col-md-12.col-lg-12.col-xl-12 #default a').slice(0,51),
// 				stateLinks = states.map(function(i, state){  return state.attribs.href })
			
// 			// for (var i = 0; i < stateLinks.length; i++) {
// 			for (var i = 0; i < stateLinks.length; i++) {
// 				request('https://www.ratebeer.com' + stateLinks[i], function (err, response, body) {
// 					if (!err) {
// 	  				$ = cheerio.load(body);
// 	  				var breweries = $('table.tablesorter').first().find('tr'),
// 	  				brewObjs = [] 

// 	  				breweries.each(function(i, brewery){
// 	  					var brewNum = $(this).find('td:nth-child(3)').text().trim(),
// 	  							brewLink = $(this).find('td:nth-child(1) a').attr('href')

// 	  					if (brewNum > 10 && brewLink) {
// 	  						request('https://www.ratebeer.com' + brewLink, function (error, response, body) {
// 					  			if (!error) {
// 					  				$ = cheerio.load(body);
// 					  				var breweryName = $('h1').html(),
// 					  						streetAddress = $('span[itemprop="address"] a').text().trim(),
// 									      phone = $('span[itemprop="telephone"] a').html(),
// 									      state = $('span[itemprop="addressRegion"]').html(),
// 									      country = $('span[itemprop="addressCountry"]').html(),
// 									      beerRows = $('#brewer-beer-table tr');
// 									  if (breweryName != '') {
// 										  Brewery.findOne({ 'name': breweryName}).select('name').exec()
// 										  .then(function(brewery) {
// 										  	if (!brewery && breweryName && beerRows.length > 10) {
// 										  		console.log("SUCCESS:  " + breweryName)
// 									      	Brewery.create({
// 									      		name: breweryName,
// 									      		address: streetAddress,
// 									      		phone: phone,
// 									      		state: state,
// 									      		country: country
// 													}, function (err, result) {
// 														if (err) console.log("Error saving " + breweryName)
// 													}).then(function() {
// 														getBeers(beerRows);
// 													})
// 										  	} else {
// 										  		console.log('Beer length: ' + beerRows.length + '  breweryName: ' + breweryName)
// 										  		getBeers(beerRows);
// 										  	}
// 										  })
// 										}

// 					  			} else {
// 					  				console.log("We’ve encountered an error: " + breweryName);
// 					  			}
// 					  		});
// 	  					}


// 	  				})

	  				

	  				
// 	  			}
// 				})


// 			} // End of for loop

// 	}

// })
    

// // for (var i = 0; i < arr.length; i++) {
// // 	var brewTitle = arr[i]
// // 	url = 'https://www.ratebeer.com/findbeer.asp?beername='+ brewTitle.replace(' ', '+');
// // 	request(url, function (error, response, body) {
// // 	  if (!error) {
// // 	  	$ = cheerio.load(body);
// // 	  	var breweryLink = $('.table-striped tr td a').attr('href')
	  	
// // 	  	if (breweryLink != '' && breweryLink.includes('brewers')) {
// // 	  		request('https://www.ratebeer.com' + breweryLink, function (error, response, body) {
// // 	  			if (!error) {
// // 	  				$ = cheerio.load(body);
// // 	  				var breweryName = $('h1').html(),
// // 	  						streetAddress = $('span[itemprop="address"] a').text().trim(),
// // 					      phone = $('span[itemprop="telephone"] a').html(),
// // 					      state = $('span[itemprop="addressRegion"]').html(),
// // 					      country = $('span[itemprop="addressCountry"]').html();

// // 					  if (breweryName != '') {
// // 						  Brewery.findOne({ 'name': breweryName}).select('name').exec()
// // 						  .then(function(brewery) {
// // 						  	if (!brewery) {
// // 						  		console.log("SUCCESS:  " + breweryName)
// // 					      	Brewery.create({
// // 					      		name: breweryName,
// // 					      		address: streetAddress,
// // 					      		phone: phone,
// // 					      		state: state,
// // 					      		country: country
// // 									}, function (err, result) {
// // 										if (err) console.log("Error saving " + breweryName)
// // 									})
// // 						  	}
// // 						  })
// // 						}

// // 	  			} else {
// // 	  				console.log("We’ve encountered an error: " + breweryLink);
// // 	  			}
// // 	  		});
// // 	  	}
	  
// // 	  } else {
// // 	    console.log("We’ve encountered an error: " + brewTitle);
// // 	  }
// // 	});
	
// // }

// var getBeers = function(beerRows) {
// 	var beerObjs = []

// 	beerRows.each(function(i, beer){
// 		var link = $(this).find('a').first().attr('href'),
// 				another = $(this).find('td').first().find('div.small em');
// 				ratings = $(this).find('td:nth-of-type(7)').text().trim();
// 		if (ratings > 5 && another.length < 1) {
// 			beerObjs.push({
// 				num: ratings,
// 				link: link
// 			})
// 		}
// 	})

// 	beerObjs.sort(function(a,b){
// 		return b.num - a.num
// 	})

// 	beerObjs = beerObjs.slice(0,5)

// 	for (var beer of beerObjs) {
// 		request({uri: 'https://www.ratebeer.com' + beer.link, encoding: null}, function (error, response, body) {
// 			if (!error) {
// 				var $ = cheerio.load(iconv.decode(body, 'iso-8859-1'));


// 				var name = $('h1').text().trim(),
// 					breweryName = $('a#_brand4 span').text().trim(),
// 					abv = $('.stats-container abbr[title="Alcohol By Volume"]').next().text().trim().replace('%', ''),
// 					// ibu = $(".stats-container big:nth-of-type(1)").text().trim(),
// 					ibu = $('.stats-container abbr[title="International Bittering Units - Normally from hops"]').next().text().trim(),
// 					calories = $('.stats-container abbr[title="Estimated calories for a 12 fluid ounce serving"]').next().text().trim(),
// 					description = $('.commercial-description-container span').text().trim(),
// 					styleName = $("#container > div.row.columns-container > div.col-sm-8 > div.reduced-border-spacing > div > div.description-box.col-sm-10 > div:nth-child(1) > a:nth-child(3)").text().trim();

// 				if (!breweryName) {
// 					debugger;
// 				}
				
// 				Brewery.findOne({ 'name': breweryName}).exec()
// 				.then(function(brewery) {
// 					Beer.findOne({ 'name': name}).exec()
// 						.then(function(beer){
// 							if (brewery && name && !beer) {
// 								Beer.create({
// 				      		name: name,
// 				      		abv: abv,
// 				      		ibu: ibu,
// 				      		calories: calories,
// 				      		description: description,
// 				      		styleName: styleName,
// 				      		_brewery: brewery.id
// 								}, function (err, result) {
// 									if (err) {
// 										console.log("Error saving " + name + err) 
// 									} else {
// 										console.log('Saved: '+ result.name)
// 										brewery.beers.push(result.id)
// 										brewery.save();
// 									}
// 								})
// 							} else {
// 								console.log('Maybe '+ name + ' already exists?')
// 							}
// 					})
// 				})
// 			} else {
// 				console.log('couldnt get this beer route... ' + error)
// 			}
// 		})
// 	}

// }
