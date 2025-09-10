const mongoose = require('mongoose');

const adoptionListingSchema = new mongoose.Schema({
  shelter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner', // Assuming 'shelter' is a type of user
    required: true
  },
  pet_name: {
    type: String,
    required: true
  },
  species: String,
  breed: String,
  age: Number,
  status: {
    type: String,
    enum: ['available', 'pending', 'adopted'],
    default: 'available'
  }
}, { timestamps: true });

module.exports = mongoose.model('AdoptionListing', adoptionListingSchema);