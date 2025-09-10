const express = require("express");
const router = express.Router();
const vetController = require("../controller/veterinarianController");

// Đăng ký bác sĩ
router.post("/register", vetController.registerVet);

// Lịch hẹn của vet
router.get("/:vetId/appointments", vetController.getAppointments);

// // Cập nhật trạng thái lịch hẹn
// router.put("/appointments/:appointmentId", vetController.updateAppointmentStatus);

// // Xem lịch sử y tế thú cưng
// router.get("/pet/:petId/history", vetController.getPetHistory);

// // Ghi chú điều trị
// router.post("/health-records", vetController.addHealthRecord);

module.exports = router;