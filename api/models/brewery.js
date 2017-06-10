const mongoose = require('mongoose'),
			createdModified = require('mongoose-createdmodified').createdModifiedPlugin

const deepPopulate = require('mongoose-deep-populate')(mongoose);

const BrewerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    country: String,
    city: String,
    webpage: String,
    logoImg: String,
    state: String,
    beers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Beer' }],
    phone: String,
    address: String,
    longitude: Number,
    latitude: Number,
    liked: {type: Number, default: 0},
    unliked: {type: Number, default: 0},
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

BrewerySchema.plugin(createdModified, { index: true })
BrewerySchema.plugin(deepPopulate, {});

const Brewery = mongoose.model('Brewery', BrewerySchema)
module.exports = Brewery