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
    ibu: mongoose.Schema.Types.Mixed,
    calories: mongoose.Schema.Types.Mixed,
    description: String,
    liked: {type: Number, default: 0},
    unliked: {type: Number, default: 0},
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

BeerSchema.plugin(createdModified, { index: true })

const Beer = mongoose.model('Beer', BeerSchema)
module.exports = Beer