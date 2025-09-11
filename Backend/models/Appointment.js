const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  pet_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true
  },
  vet_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Veterinarian',
  },
  appointment_time: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);