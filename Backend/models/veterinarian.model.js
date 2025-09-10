// models/Veterinarian.js
const mongoose = require("mongoose");

const veterinarianSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  address: String,
  specialization: String,
  experience: Number,
  available_slots: [String]
});

module.exports = mongoose.model("Veterinarian", veterinarianSchema);