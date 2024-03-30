const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/testing");

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  age: Number,
  nickname: String,
  description: String,
  password: String,
  categories: {
    type: Array,
    default: [],
  },
  datecreated:{
    type: Date,
    default: Date.now
  }
})
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema)