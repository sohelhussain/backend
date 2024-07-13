const express = require("express");
const { userModel, validateModel } = require("./models/users");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send("Welcome");
});

app.post("/create", async (req, res, next) => {
    let {username, name, email, age, number} = req.body;
    let error = validateModel({username, name, email, age, number})
    if (error) return res.status(500).send(error.message); // if we write a return instead else 
//   const user = await userModel.create({
//     username: req.body.username,
//   });
  res.send("check your username");
});

app.listen(3000);
