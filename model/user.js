const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'must provide username'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'must provide email'],
  },
  password: {
    type: String,
    required: [true, 'must provide password'],
  },
  status:{
    type: Boolean,
    default:true
  },
  block_status:{
    type: Boolean,
    default:true
  },
  completed: {
    type: Boolean,
    default: false,
  },
  adminstatus:{
    type:Boolean,
    default:false
  },
  versionKey: false 
})

module.exports = mongoose.model('User', UserSchema)
