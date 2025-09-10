const Veterinarian = require("../model/veterinarian.model");
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