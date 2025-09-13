const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  species: String,
  breed: String,
  age: Number,
  gender: String
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);