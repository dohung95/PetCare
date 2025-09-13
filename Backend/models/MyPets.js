const mongoose = require("mongoose");

const MyPetsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String },
    age: { type: Number },
    medicalHistory: { type: String },
    avatar: { type: String },

    // Quản lý hồ sơ sức khỏe
    vaccinations: [
      {
        date: Date,
        description: String,
      },
    ],
    allergies: [String],
    treatments: [
      {
        date: Date,
        description: String,
      },
    ],

    // Thư viện ảnh & tài liệu
    gallery: [String], // lưu đường dẫn ảnh
    documents: [String], // lưu file scan giấy tờ

    // Thông tin bảo hiểm
    insurance: {
      provider: String,
      policyNumber: String,
      claims: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MyPets", MyPetsSchema, "mypets");