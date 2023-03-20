const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  notesBody: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  useremail: {
    type: String,
    required: true,
  },
});

const NotesModel = mongoose.model("notes", NotesSchema);
module.exports = NotesModel;
