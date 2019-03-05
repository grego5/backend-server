const db = require('../models');

exports.createPost = async function(req, res ,next){
   try {
      const {id} = req.params;
      const post = await db.Post.create({
         text: req.body.text,
         user: id
      });
      const user = await db.User.findById(id);
      if (!user) throw {message: 'Username does not exist'};
      user.posts.push(post.id);
      await user.save();
      const createdPost = await db.Post.findById(post.id).populate('user', {
         username: true,
         image: true
      });
      return res.status(200).json(createdPost);
   } catch(err) {
      console.log(err.message);
      next({message:err.message, status: 400});
   };
};

exports.getPost = async function(req, res ,next){
   try {
      const post = await db.Post.findById(req.params.postId);
      if (!post) throw {message: 'Post is not found'};
      return res.status(200).json(post);
   } catch(err) {
      console.log(err.message);
      next({message:err.message, status: 400});
   }
};

exports.deletePost = async function(req, res ,next){
   try {
      const post = await db.Post.findById(req.params.postId);
      if (!post) throw {message: 'Post is not found'};
      await post.remove();
      return res.status(200).json(post);
   } catch(err) {
      console.log(err.message);
      next({message:err.message, status: 400});
   }
};

module.exports = exports;