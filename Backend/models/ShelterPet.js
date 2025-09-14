const mongoose = require('mongoose');
const careLogSchema = require('./CareLogSchema');
const ShelterPetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  neutered: {
    type: Boolean,
    default: false
  },
  logs: [careLogSchema],
  breed: { 
    type: String, 
    default: "" 
  }, 
  
  personality: [String], 
  vaccinated: {
    type: Boolean,
    default: false
  },
  health: String,
  type: String,
  color: String,
  age: String,
  ageCategory: String,
  image: String,
  gender: Boolean,

  size: String,
  story: String,
}, { timestamps: true });

module.exports = mongoose.model('ShelterPet', ShelterPetSchema);