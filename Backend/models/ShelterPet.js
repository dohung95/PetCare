const mongoose = require('mongoose');

const ShelterPetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  neutered: {
    type: Boolean,
    default: false
  },
  
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
  age: Number,
  ageCategory: String,
  image: String,
  gender: Boolean,
  // Thêm các trường còn thiếu từ dữ liệu mẫu
  size: String,
  story: String,
}, { timestamps: true });

module.exports = mongoose.model('ShelterPet', ShelterPetSchema);