const router = require('express').Router({mergeParams: true});

const { createPost, allPosts, onePost, deletePost } = require('../handlers/post');

router.route('/')
   .get(allPosts)
   .post(createPost);

router.route('/:postId')
   .get(onePost)
   .delete(deletePost);
   
module.exports = router;