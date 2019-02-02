const db = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new db.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	image: {
		type: String
	 },
	 posts: [{
		 type: db.Schema.Types.ObjectId,
		 ref: 'Post'
	 }]
});

userSchema.pre('save', async function(next){
	try {
		if (!this.isModified('password')) {
			return next();
		}
		let hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;
		return next();
	} catch (err) {
		return next(err);
	}
})

userSchema.methods.checkPassword = async function(plainPassword, next){
	try {
		const isMatch = await bcrypt.compare(plainPassword, this.password);
		return isMatch;
	} catch(err) {
		return next(err);
	}
}

module.exports = db.model('User', userSchema);
