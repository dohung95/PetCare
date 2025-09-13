const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const shelterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
      ]
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{9,12}$/]
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      enum: ['owner', 'admin', 'vet', 'shelter'],
      default: 'shelter',
    },
  },
  { timestamps: true }
);

shelterSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

shelterSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model('Shelter', shelterSchema);