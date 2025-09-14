const mongoose = require('mongoose');

const ALLOWED_TARGETS = ['feedback', 'other'];

const feedbackSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    name: { type: String, trim: true, maxlength: 120 },
    email: { type: String, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/] },
    phone: { type: String, trim: true, match: [/^\+?\d{8,15}$/] },
    type: { type: String, enum: ALLOWED_TARGETS, default: 'feedback', index: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, trim: true, maxlength: 2000 },

    isApproved: { type: Boolean, default: true, index: true },
    meta: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  }
);

feedbackSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    rating: this.rating,
    message: this.message,
    name: this.name,
  };
};

module.exports = mongoose.model('Feedback', feedbackSchema);

