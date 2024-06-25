const asyncHandler = require('express-async-handler')
const Post = require('../models/posts')
const User = require('../models/users')
const Comment = require('../models/comments')



exports.posts = asyncHandler(async (req, res, next) => {
    res.json('all posts')
})

exports.singlePost = asyncHandler(async (req, res, next) => {
    res.json('single post')
})

exports.likePost = asyncHandler(async (req, res, next) => {
    res.json('like post')
})

exports.updateLikes = asyncHandler(async (req, res, next) => {
    res.json('update likes')
})

exports.createComment = asyncHandler(async (req, res, next) => {
    res.json('comment on post')
})

exports.likeComment = asyncHandler(async (req, res, next) => {
    res.json('like comment')
})

exports.createPost = asyncHandler(async (req, res, next) => {
    res.json('create post')
})