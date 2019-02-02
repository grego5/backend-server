const db = require('mongoose');
const User = require('./user');

const postSchema = new db.Schema({
   text: {
      type: String,
      required: true,
      maxLength: 160
   },
   date: {
      type: Date,
      default: Date.now
   },
   user: {
      type: db.Schema.Types.ObjectId,
      ref: 'User'
   }
}, {timestamps: true});

postSchema.pre('remove', async function(next){
   try {
      const user = await User.findById(this.user);
      await user.posts.remove(this.id);
      await user.save();
      return next();
   } catch(err) {
      next(err);
   };
});

module.exports = db.model('Post', postSchema);