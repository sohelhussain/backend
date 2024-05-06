const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/nightdb');

const userSchema = mongoose.Schema({
    username: {
        type: String,
    },
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    },
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post',
        }
    ]
})
module.exports = mongoose.model('user', userSchema)