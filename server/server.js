const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./models/Users")
require("dotenv").config()
const uri = process.env.ATLAS_URI

app.use(express.json())
app.use(cors())

mongoose.connect(uri)
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB Database has succesfully connected")
})

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

  
  app.listen(3001, () => {
    console.log("SERVER RUNS PERFECTLY!");
  });  
