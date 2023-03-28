const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const NotesModel = require("./models/Notes");
require("dotenv").config();
const uri = process.env.REACT_APP_ATLAS_URI;

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

app.put("/update", (req, res) => {
  const newNoteTitle = req.body.currentTitle
  const newNoteNotesBody = req.body.currentNoteBody
  const id = req.body.id

  try{
    NotesModel.findById(id, (err, updatedNote) => {
      updatedNote.title = newNoteTitle
      updatedNote.notesBody = newNoteNotesBody
      updatedNote.save()
      res.send("updated")
    })
  }catch (err) {
    console.log(err)
  }
})

app.delete("/deleteNote/:id", async (req, res) => {
  const id = req.params.id;
  await NotesModel.findByIdAndRemove(id).exec();
  res.send("item deleted");
});

app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});
