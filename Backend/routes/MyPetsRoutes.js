const express = require("express");
const router = express.Router();
const MyPetsController = require("../controllers/MyPetsController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// CRUD Pets
router.get("/", MyPetsController.getAllPets);
router.get("/:id", MyPetsController.getPetById);
router.post("/", MyPetsController.createPet);
router.put("/:id", MyPetsController.updatePet);
router.delete("/:id", MyPetsController.deletePet);
router.post("/:id/upload-avatar", upload.single("avatar"), MyPetsController.uploadAvatar);
router.post("/:id/upload-gallery", upload.single("image"), MyPetsController.uploadGallery);
router.post("/:id/upload-document", upload.single("document"), MyPetsController.uploadDocument);

module.exports = router;