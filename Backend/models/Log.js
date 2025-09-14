
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  petId: {
    type: Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Log', LogSchema);