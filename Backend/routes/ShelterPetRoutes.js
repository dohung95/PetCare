const express = require("express");
const router = express.Router();
const shelterPetController = require("../controllers/ShelterPetController");
const upload = require("../middlewares/upload");

// Create new pet (có thể có ảnh)
router.post("/", upload.single("image"), shelterPetController.createShelterPet);

// Get all pets
router.get("/", shelterPetController.getAllShelterPets);

// Get a single pet
router.get("/:id", shelterPetController.getShelterPetById);

// Update pet (có thể có ảnh mới)
router.put("/:id", upload.single("image"), shelterPetController.updateShelterPet);

// Toggle availability
router.patch("/:id/toggle", shelterPetController.toggleAvailability);

// Delete pet
router.delete("/:id", shelterPetController.deleteShelterPet);

module.exports = router;
