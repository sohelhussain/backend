var express = require('express');
var router = express.Router();
const userModel = require("./users")
const localStrategy = require('passport-local');
const passport = require('passport');
passport.use(new localStrategy(userModel.authenticate()));

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next()
  res.redirect("/")
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile")
})

router.post("/register", (req, res) => {
  let userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret
  })

  userModel.register(userdata, req.body.password)
  .then(registerduser => {
    passport.authenticate("local")(req, res, () => {
      res.redirect("/profile")
    })
  })
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}) , (req,res, next) => {})

router.get("/logout", (req, res, next) => {
  req.logOut( err => {
    if(err) return next(err)
    res.redirect("/")
  })
})



module.exports = router;
