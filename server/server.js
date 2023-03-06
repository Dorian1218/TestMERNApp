const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const NotesModel = require("./models/Notes");
require("dotenv").config();
const uri = process.env.ATLAS_URI;

app.use(express.json());
app.use(cors());

mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Database has succesfully connected");
});

app.get("/getNotes", (req, res) => {
  NotesModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createNote", async (req, res) => {
  const note = req.body;
  const newNote = new NotesModel(note);
  await newNote.save();

  res.json(note);
});

app.delete("/deleteNote/:id", async (req, res) => {
  const id = req.params.id;
  await NotesModel.findByIdAndRemove(id).exec();
  res.send("item deleted");
});

app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});
