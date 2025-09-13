require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Owner = require("./models/Owner"); // chỉnh đường dẫn nếu khác

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/PetCare";

const roles = ["owner", "admin", "vet", "shelter"];

// === 6 thành viên với địa chỉ riêng ===
const members = [
  { username: "hung",    address: "123 Lê Lợi, Quận 1, TP.HCM" },
  { username: "vinhhuy", address: "45 Trần Hưng Đạo, Quận 5, TP.HCM" },
  { username: "nhan",    address: "67 Phạm Văn Đồng, Quận Thủ Đức, TP.HCM" },
  { username: "thu",     address: "89 Nguyễn Huệ, Quận 1, TP.HCM" },
  { username: "giahuy",  address: "101 Hai Bà Trưng, Quận 3, TP.HCM" },
  { username: "dat",     address: "222 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM" },
];

function toTitle(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, { family: 4 });
    console.log("✅ Connected to MongoDB");

    const passwordHash = await bcrypt.hash("PetCare123!", 10);

    const users = [];
    for (let m of members) {
      for (let role of roles) {
        users.push({
          // name cần để thoả schema
          name: `${toTitle(m.username)} ${toTitle(role)}`, // ví dụ "Hung Owner"
          email: `${m.username}_${role}@petcare.com`,
          password: passwordHash,
          phone: `09${Math.floor(10000000 + Math.random() * 89999999)}`, // random 10 số
          address: m.address,
          role,
        });
      }
    }

    // Xoá data cũ
    await Owner.deleteMany({});
    // Thêm mới
    await Owner.insertMany(users);

    console.log("🎉 Seeded users successfully!");
    console.log("Accounts created:");
    users.forEach((u) =>
      console.log(
        ` ${u.email} / PetCare123! / role=${u.role} / name=${u.name} / address=${u.address}`
      )
    );

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding users:", err);
    process.exit(1);
  }
}

seed();
