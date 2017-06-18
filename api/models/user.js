const mongoose = require('mongoose'),
	  createdModified = require('mongoose-createdmodified').createdModifiedPlugin

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 6
    },
    firstName: String,
    lastName: String, 
    password: {
    	type: String,
    	required: true,
    	min: 6
    },
    admin: Boolean,
    profileImg: String,
    likedBeers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Beer' }]
});

UserSchema.plugin(createdModified, { index: true })

const User = mongoose.model('User', UserSchema)
module.exports = User