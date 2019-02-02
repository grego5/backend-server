const router = require('express').Router({mergeParams: true});

const { createPost, getPost, deletePost } = require('../handlers/post');

router.route('/')
   .post(createPost);

router.route('/:postId')
   .get(getPost)
   .delete(deletePost);
   
module.exports = router;