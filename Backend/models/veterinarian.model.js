const mongoose = require("mongoose");

const veterinarianSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  address: String,
  specialization: String,
  experience: Number,
  available_slots: [String],
  cv_path: { type: String }, // Store path to uploaded CV PDF
  certificate_paths: [{ type: String }] // Store paths to uploaded certificate images
});

module.exports = mongoose.model("Veterinarian", veterinarianSchema);