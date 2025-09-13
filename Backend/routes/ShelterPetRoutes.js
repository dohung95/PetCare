// routes/shelterPetRoutes.js

const express = require("express");
const router = require("express").Router();
const shelterPetController = require("../controllers/ShelterPetController");
const upload = require("../middlewares/upload");

// --- API Routes for Shelter Pets ---

// ✅ Pet Management
router.post("/", upload.single("image"), shelterPetController.createShelterPet);
router.get("/", shelterPetController.getAllShelterPets);
router.get("/:id", shelterPetController.getShelterPetById);
router.put("/:id", upload.single("image"), shelterPetController.updateShelterPet);
router.delete("/:id", shelterPetController.deleteShelterPet);
router.patch("/:id/toggle", shelterPetController.toggleAvailability);

// Thêm middleware tạm ở đây
router.use('/:id/logs', (req, res, next) => {
  console.log(`[shelter-pets] ${req.method} /${req.params.id}/logs`);
  next();
});

// ✅ Care Log Management
router.get('/:id/logs', shelterPetController.getCareLogs);
// Add new log
router.post('/:id/logs', shelterPetController.addCareLog);
// ✅ Log update
router.put('/:id/logs/:logId', shelterPetController.updateCareLog);

module.exports = router;