const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ["dog", "cat"], required: true },
  price: { type: Number, required: true, min: 0 },
  description: String,
  stock_quantity: { type: Number, required: true, min: 0 },
  image: String,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
