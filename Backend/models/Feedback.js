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

// feedbackSchema.statics.getRatingSummary = async function getRatingSummary({ targetType, targetId, approvedOnly = true }) {
//   const match = { targetType, targetId: String(targetId) };
//   if (approvedOnly) match.isApproved = true;

//   const results = await this.aggregate([
//     { $match: match },
//     {
//       $group: {
//         _id: '$rating',
//         count: { $sum: 1 },
//       },
//     },
//   ]);

//   const histogram = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
//   let total = 0;
//   let weighted = 0;
//   for (const row of results) {
//     const r = Number(row._id);
//     const c = Number(row.count);
//     if (histogram[r] != null) histogram[r] = c;
//     total += c;
//     weighted += r * c;
//   }
//   const average = total ? +(weighted / total).toFixed(2) : 0;

//   return { targetType, targetId: String(targetId), total, average, histogram };
// };

module.exports = mongoose.model('Feedback', feedbackSchema);

