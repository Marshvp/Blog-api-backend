const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'users' },
    postLikes: { type: Number, default: 0 },

})