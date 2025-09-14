const Veterinarian = require("../models/veterinarian.model");
const path = require("path");
const fs = require("fs");

// Ensure upload directories exist
const cvDir = path.join(__dirname, "../uploads/cvs");
const certDir = path.join(__dirname, "../uploads/certificates");
if (!fs.existsSync(cvDir)) fs.mkdirSync(cvDir, { recursive: true });
if (!fs.existsSync(certDir)) fs.mkdirSync(certDir, { recursive: true });

// 1. Đăng ký bác sĩ with file uploads
exports.registerVet = async (req, res) => {
  try {
    const { name, email, phone, address, specialization, experience, available_slots } = req.body;
    
    // Handle CV file
    let cvPath = null;
    if (req.files?.cv) {
      const cvFile = req.files.cv;
      if (cvFile.mimetype !== "application/pdf") {
        return res.status(400).json({ error: "CV must be a PDF file" });
      }
      const cvFileName = `${Date.now()}_${cvFile.name}`;
      cvPath = path.join("uploads/cvs", cvFileName);
      await cvFile.mv(path.join(__dirname, "../", cvPath));
    }

    // Handle certificate files
    const certificatePaths = [];
    if (req.files?.certificates) {
      const certFiles = Array.isArray(req.files.certificates) 
        ? req.files.certificates 
        : [req.files.certificates];
      
      for (const certFile of certFiles) {
        if (!["image/jpeg", "image/png"].includes(certFile.mimetype)) {
          return res.status(400).json({ error: "Certificates must be JPEG or PNG images" });
        }
        const certFileName = `${Date.now()}_${certFile.name}`;
        const certPath = path.join("uploads/certificates", certFileName);
        await certFile.mv(path.join(__dirname, "../", certPath));
        certificatePaths.push(certPath);
      }
    }

    const vet = new Veterinarian({
      name,
      email,
      phone,
      address,
      specialization,
      experience,
      available_slots: available_slots ? JSON.parse(available_slots) : [],
      cv_path: cvPath,
      certificate_paths: certificatePaths
    });

    await vet.save();
    res.status(201).json(vet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 2. Xem lịch hẹn của vet
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ vet_id: req.params.vetId })
      .populate("pet_id")
      .populate("owner_id");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// // 3. Cập nhật tình trạng lịch hẹn (approve/reschedule/cancel)
// exports.updateAppointmentStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const appointment = await Appointment.findByIdAndUpdate(
//       req.params.appointmentId,
//       { status },
//       { new: true }
//     );
//     res.json(appointment);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // 4. Xem lịch sử y tế thú cưng
// exports.getPetHistory = async (req, res) => {
//   try {
//     const records = await HealthRecord.find({ pet_id: req.params.petId })
//       .populate("pet_id")
//       .populate("vet_id");
//     res.json(records);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // 5. Ghi chú điều trị
// exports.addHealthRecord = async (req, res) => {
//   try {
//     const record = new HealthRecord(req.body);
//     await record.save();
//     res.status(201).json(record);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };












// CỦA E ĐẠT Ạ ==============================================
// GET /api/veterinarians?q=&page=&limit=&sort=
exports.list = async (req, res) => {
  try {
    const { q, page = 1, limit = 20, sort = "-createdAt" } = req.query;
    const filter = {};
    if (q) {
      filter.$or = [
        { name:  { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
        { address: { $regex: q, $options: "i" } },
        { specialization: { $regex: q, $options: "i" } },
      ];
    }

    const pageNum = Math.max(1, Number(page));
    const perPage = Math.min(100, Math.max(1, Number(limit)));

    const [items, total] = await Promise.all([
      Veterinarian.find(filter)
        .sort(sort)
        .skip((pageNum - 1) * perPage)
        .limit(perPage)
        .lean(),
      Veterinarian.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: items,
      pagination: {
        total,
        page: pageNum,
        limit: perPage,
        pages: Math.ceil(total / perPage),
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/veterinarians/:id
exports.getById = async (req, res) => {
  try {
    const doc = await Veterinarian.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    return res.json({ success: true, data: doc });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/veterinarians/:id (từ chối = xóa)
exports.remove = async (req, res) => {
  try {
    const doc = await Veterinarian.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    return res.json({ success: true, message: "Rejected & removed" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
// ĐẾN ĐÂY THÔI Ạ ===========================================