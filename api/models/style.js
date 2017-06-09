const mongoose = require('mongoose'),
	  createdModified = require('mongoose-createdmodified').createdModifiedPlugin

const StyleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: String,
    beers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Beer' }]
});

StyleSchema.plugin(createdModified, { index: true })

const Style = mongoose.model('Style', StyleSchema)
module.exports = Style
