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


//this code is for flash massage

// router.get("/create", (req, res) => {
//   const user = "sohel"
//   req.flash("status", user);
//   res.send("this is create page")
// });
// router.get("/check", (req, res) => {
//   console.log(req.flash("status"));
//   res.send("this is check page")
// });


//this code is for mongoose


// this route are made user

// router.get("/mongoose", async (req, res) => {
//   let userData = await userModel.create({
//     username: "harshi",
//     nickname: "harshiiiiiiiiiiiii",
//     description: "i'm a cute girl",
//     age: 21,
//     name: "harshi mehra",
//     categories: {
//       type: Array,
//       default: ['fashion', 'mecup', 'clothe', 'shoes']
//     },
//   })
//   res.send(userData)
// });

// how can i perform a case-insensitive search in mongoose?

// router.get("/find", async (req, res) => {
//   let regex = new RegExp("harsh vardhan sharma", "i")
//   let user = await userModel.find({name: regex})
//   res.send(user)
// })

//how do i find documents where an array field contains all of a set of values?

// router.get("/find", async (req, res) => {
//   let user = await userModel.find({categories: {$all: ["css"]}})
//   res.send(user)
// })   ---> this code are not working for some reason

//how can i search for documents with a specific date range in mongoose?

// router.get("/find", async (req, res) => {
//   let date1 = new Date('2024-04-01');
//   let date2 = new Date('2024-04-02');
//   let user = await userModel.find({datecreated: {$gte: date1, $lte: date2}})
//   res.send(user)
// })

// how can i filter document based on the existence of a field in mongoose?

// router.get("/find", async (req, res) => {
//   let user = await userModel.find({categories: {$exists: true}})
//   res.send(user)
// });

// how can i filter document based on a specific field's length in mongoose? 
 
// router.get("/find", async (req, res) => {
//   let user = await userModel.find({
//     $expr: {
//       $and: [
//         {$gte: [{$strLenCP: '$nickname'}, 0]},
//         {$lte: [{$strLenCP: '$nickname'}, 30]}
//       ]
//     }
//   })
//   res.send(user)
// });



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
