const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ownerSchema = new mongoose.Schema(
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
      select: false, // không trả về mặc định
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
    },
    role: {
      type: String,
      enum: ["owner", "admin", "vet", "shelter"],
      default: "owner",
    },
  },
  { timestamps: true }
);


ownerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


ownerSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("Owner", ownerSchema);
