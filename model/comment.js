const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  comment_text:{
    type: String,
    required: [true, 'must provide Your comment']
  },
  date: {
    type: Date,
    default: Date.now
  },
  status:{
    type: Boolean,
    default:false
  },
  completed: {
    type: Boolean,
    default: false,
  },
  create_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  create_at:{
    type: Date,
		default: Date.now,
  },
  news: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "news",
  },
  versionKey: false 
})

module.exports = mongoose.model('Comment', commentSchema)
