const express = require('express');
const userModel = require('./model/user');
const postModel = require('./model/post');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const isLoggedIn = (req, res, next) => {
    if(req.cookies.token === "") return res.redirect("/login")
    else{
        let data = jwt.verify(req.cookies.token, "secret")
        req.user = data
}
    next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/profile', isLoggedIn, async(req, res) => {
    let user = await userModel.findOne({email: req.user.email})
    .populate('posts')
    res.render('profile', {user})
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/register', (req, res) => {
    let {username, password, name, email} = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            userModel.create({
                username,
                name,
                email,
                password: hash,
            }).then(user => {
                let token = jwt.sign({email: email, userId: user._id}, 'secret');
                res.cookie("token", token)
                res.redirect('/profile')
            })
        });
    })
})
app.post('/profile/post', isLoggedIn, async (req, res) => {
    console.log(req.user);
    let user = await userModel.findOne({email: req.user.email});
    console.log(user);
    let {image, data} = req.body;
   let post = await postModel.create({
       user: user._id,
        postData: data,
        image
    })
    user.posts.push(post._id)
    await user.save()
    res.redirect('/profile')
})
app.post('/login', async (req, res) => {
    let {password, email} = req.body;
    let user = await userModel.findOne({email});
    console.log(user);
    if(!user) return res.send("user not found")
    bcrypt.compare(password, user.password,(err, result) => {
        console.log(result);
        if(result) {
            let token = jwt.sign({email: email, userId: user._id}, 'secret');
            res.cookie("token", token)
            res.redirect("/profile");
        }
        else res.redirect("/login")
    })
})
app.get('/logout', (req, res) => {
    res.cookie("token", "")
    res.redirect("/login")
})


app.listen(3000)