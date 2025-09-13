const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  pet_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  vet_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Veterinarian', // thêm mới để lấy vet name
    required: true
  },
  visit_date: {
    type: Date,
    default: Date.now
  },
  diagnosis: String,
  treatment: String
}, { timestamps: true });

module.exports = mongoose.model('HealthRecord', healthRecordSchema);