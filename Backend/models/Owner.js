const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password_hash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['owner', 'admin', 'vet'],
    default: 'owner'
  },
  address: String
}, { timestamps: true });

module.exports = mongoose.model('Owner', ownerSchema);