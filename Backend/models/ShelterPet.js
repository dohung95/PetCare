const mongoose = require('mongoose');

const ShelterPetSchema = new mongoose.Schema({
  shelter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shelter',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  neutered: {
    type: Boolean,
    default: false
  },
  type: String,
  color: String,
  age: Number,
  ageCategory: String,
  image: String,
  gender: Boolean
}, { timestamps: true });

module.exports = mongoose.model('ShelterPet', ShelterPetSchema);