const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Comment = new Schema({
    postID: { type: Schema.Types.ObjectId, ref: 'posts', required: true },
    content: { type: String , required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    commentLikes: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
})

Comment.virtual('formattedDate').get(function() {
    return `${this.date.getDate()}/${this.date.getMonth() + 1}/${this.date.getFullYear()}`
})

module.exports = mongoose.model('Comment', Comment)