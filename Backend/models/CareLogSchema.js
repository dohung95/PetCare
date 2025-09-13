const mongoose = require('mongoose');

const careLogSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['feeding', 'grooming', 'vaccination', 'checkup', 'dental', 'medication', 'other'],
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  
});

module.exports = careLogSchema;