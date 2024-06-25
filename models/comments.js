const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Comment = new Schema({
    postID: { type: Schema.Types.ObjectId, ref: 'posts', required: true },
    content: { type: String , required: true },
    author: { type: Schema.Types.ObjectId, ref: 'users' },
    commentLikes: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
})


module.exports = Comment