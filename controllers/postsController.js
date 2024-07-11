const asyncHandler = require('express-async-handler')
const Post = require('../models/posts')
const User = require('../models/users')
const Comment = require('../models/comments')
const { body, validationResult } = require('express-validator')



exports.posts = asyncHandler(async (req, res, next) => {
    const published = await Post.find( { published: true } ).populate('author', 'name')
    const unpublished = await Post.find( { published: false } ).populate('author', 'name')

    console.log("posts hit");

    


    res.json({ posts: {
        published: published,
        unpublished: unpublished
    } })
})

exports.singlePost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id).populate('author', 'name')
    const comment = await Comment.find({ postID: req.params.id }).populate('author', 'name')

    console.log("single post hit");
    
    console.log(comment);

    res.json({ 
        post: post,
        comments: comment
    })
})

exports.editPost = [

    body('postTitle')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Post title is required')
    .escape(),
    body('postContent')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Post content is required')
    .escape(),


    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { postTitle, postContent, status } = req.body
        const post = await Post.findById(req.params.id)

        if(status === 'publish') {
            post.published = true
        } else if(status === 'unpublish') {
            post.published = false
        }
        post.title = postTitle
        post.content = postContent

        await post.save()
        res.json('edit post')

    })
]

exports.likePost = asyncHandler(async (req, res, next) => {
    res.json('like post')
})

exports.updateLikes = asyncHandler(async (req, res, next) => {
    res.json('update likes')
})

exports.createComment = [

    body('comment')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Comment is required')
    .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        console.log("create comment hit");
        console.log(req);
        const postId = req.params.id
        const userId = req.user._id
        
        const comment = new Comment({
            postID: postId,
            author: userId,
            content: req.body.comment
        })

        await comment.save()

        res.json({
            _id: comment._id,
            content: comment.content,
            author: {
                name: req.user.name
            },
            date: comment.date
        })
    })
]

exports.likeComment = asyncHandler(async (req, res, next) => {
    res.json('like comment')
})

exports.createPost = [

    body('postTitle')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Post title is required')
    .escape(),
    body('postContent')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Post content is required')
    .escape(),

asyncHandler(async (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { postTitle, postContent } = req.body
    const user = await User.findOne({ name: req.user.name })
    
    const post = new Post({
        title: postTitle,
        content: postContent,
        author: user._id
    })

    await post.save()

    res.json({ 
        message: 'post created', 
        post: post,
        createdBy: req.user.name 
    })

})
]

exports.deletePost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id)

    if(!post) {
        return res.status(404).json({ message: 'Post not found' })
    }
    await post.remove()
    res.json({ message: 'post deleted' })
})