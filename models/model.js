const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number,
  },
  email: {
    required: true,
    type: String,
  },

  createdAt: {
    type: Date,
  },

  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("User", dataSchema);
