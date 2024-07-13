const joi = require('joi');
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/joitest")
  .then(() => {
    console.log("mongodb are connected");
  })
  .catch((err) => console.error(err));

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
  },
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  email: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    minlength: 7,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
  },
});

function validateModel(data) {
    let schema = joi.object({
        username: joi.string().min(3).required(),
        name: joi.string().min(3).required(),
        email: joi.string().email().required(),
        number: joi.string().min(7).required(),
        age: joi.string()
    });

    let resolveans = schema.validate(data)
    return resolveans;
    // console.log(resolveans.error?.message);
}

const userModel = mongoose.model("User", userSchema);

module.exports = {userModel, validateModel}
