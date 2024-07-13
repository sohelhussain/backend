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
    validateModel({username, name, email, age, number})
//   const user = await userModel.create({
//     username: req.body.username,
//   });
  res.send("check your username");
});

app.listen(3000);
