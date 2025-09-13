const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  type: { type: String, required: true, enum: ['vaccination', 'treatment', 'allergy', 'illness'] },
  description: { type: String, required: true },
  notes: { type: String },
});

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  uploaded_at: { type: Date, default: Date.now },
});

const insuranceSchema = new mongoose.Schema({
  policy_number: { type: String, required: true },
  provider: { type: String },
  documents: [documentSchema],
});

const myPetsSchema = new mongoose.Schema({
  owner_id: { type: String, required: true },
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String },
  age: { type: Number },
  image: { type: String, default: '' },
  photos: [{ type: String }],
  medical_history: { type: String },
  health_records: [healthRecordSchema],
  documents: [documentSchema],
  insurance: insuranceSchema,
  created_at: { type: Date, default: Date.now },
}, { collection: 'mypets' });

module.exports = mongoose.model('MyPets', myPetsSchema);