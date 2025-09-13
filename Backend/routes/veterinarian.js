const express = require("express");
const router = express.Router();
const vetController = require("../controllers/veterinarianController");
const multer = require("multer");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "cv") {
      cb(null, "uploads/cvs");
    } else if (file.fieldname === "certificates") {
      cb(null, "uploads/certificates");
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "cv" && file.mimetype !== "application/pdf") {
      return cb(new Error("CV must be a PDF file"));
    }
    if (file.fieldname === "certificates" && !["image/jpeg", "image/png"].includes(file.mimetype)) {
      return cb(new Error("Certificates must be JPEG or PNG images"));
    }
    cb(null, true);
  }
});

// Đăng ký bác sĩ with file uploads
router.post("/register", 
  upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "certificates", maxCount: 5 }
  ]), 
  vetController.registerVet
);

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