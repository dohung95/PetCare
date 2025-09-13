const express = require("express");
const router = express.Router();
const vetController = require("../controllers/veterinarianController");

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





// của e đạt đừng xóa thưa ngài từ đây ==============================
// Danh sách đăng ký
router.get("/", vetController.list);

// Xem chi tiết 1 đăng ký
router.get("/:id", vetController.getById);

// Từ chối (xóa)
router.delete("/:id", vetController.remove);
// đến đây ạ ======================================================


module.exports = router;