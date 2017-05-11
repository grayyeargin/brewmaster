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
    beers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Beer' }],
    phone: String,
    address: String,
    longitude: Number,
    latitude: Number,
    liked: Number,
    unliked: Number,
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

BrewerySchema.plugin(createdModified, { index: true })

const Brewery = mongoose.model('Brewery', BrewerySchema)
module.exports = Brewery