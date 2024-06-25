const express = require("express");
const router = express.Router();

const postsController = require('../controllers/postsController')


router.get('/', postsController.posts)

router.get('/:id', postsController.singlePost)

router.get('/:id/like', postsController.likePost)

router.post('/:id/like', postsController.updateLikes)

router.post('/:id/comment', postsController.createComment)

router.get('/:id/comment/like', postsController.likeComment)

router.post('/', postsController.createPost)


module.exports = router