const mongoose = require('mongoose'),
			createdModified = require('mongoose-createdmodified').createdModifiedPlugin

const BrewerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    location: String,
    webpage: String,
    logoImg: String,
    beers: Array,
    phone: String,
    address: String,
    longitude: Number,
    latitude: Number
});

Brewery.plugin(createdModified, { index: true })

const Brewery = mongoose.model('Brewery', BrewerySchema)
module.exports = Brewery