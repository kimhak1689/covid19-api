const mongoose = require('mongoose')
require("dotenv").config();

const uri= 'mongodb+srv://admin:SADFetylakosa123@cluster0.6g8n3.mongodb.net/covid19DB?retryWrites=true&w=majority';
const option = {
  autoIndex:false,
  maxPoolsize:10,
  serverSelectionTimeoutMS:5000,
  socketTimeoutMS:45000,
  family:4
};

const connectDB = (url) => {
  return mongoose.connect(uri,option)
}

module.exports = connectDB;
