const mongoose = require('mongoose'),
	  createdModified = require('mongoose-createdmodified').createdModifiedPlugin

const BeerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    logoImg: String,
    _brewery: { type: mongoose.Schema.Types.ObjectId, ref: 'Brewery' },
    style: { type: mongoose.Schema.Types.ObjectId, ref: 'Style' },
    styleName: String,
    abv: String,
    ibu: Number,
    calories: Number,
    description: String,
    liked: Number,
    unliked: Number,
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

BeerSchema.plugin(createdModified, { index: true })

const Beer = mongoose.model('Beer', BeerSchema)
module.exports = Beer