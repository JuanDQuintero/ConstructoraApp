const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
  },
  userName: {
    type: String,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  lt: {
    type: Number,
    required: true,
  },
  lg: {
    type: Number,
    required: true,
  }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
