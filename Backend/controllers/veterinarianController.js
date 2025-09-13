const Veterinarian = require("../models/veterinarian.model");
// const Appointment = require("../model/Appointment");
// const HealthRecord = require("../model/HealthRecord");

// 1. Đăng ký bác sĩ
exports.registerVet = async (req, res) => {
  try {
    const vet = new Veterinarian(req.body);
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