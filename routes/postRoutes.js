const express = require("express");
const router = express.Router();
const passport = require('../config/passportConfig');

const postsController = require('../controllers/postsController')


router.get('/', postsController.posts)

router.get('/:id', postsController.singlePost)

router.get('/:id/likes', postsController.likePost)

router.post('/:id/likes', postsController.updateLikes)

router.post('/:id/comments', passport.authenticate('jwt', { session: false }) ,postsController.createComment)

router.get('/:id/comments/likes', postsController.likeComment)

router.post('/create_posts', passport.authenticate('jwt', { session: false }), postsController.createPost)

router.post('/:id/edit', passport.authenticate('jwt', { session: false }), postsController.editPost)

router.post('/:id/delete', passport.authenticate('jwt', { session: false }), postsController.deletePost)


module.exports = router