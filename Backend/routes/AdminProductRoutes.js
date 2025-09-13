const express = require("express");
const router = express.Router();
const AdminProductController = require("../controllers/AdminProductController");
const { verifyToken, checkRole } = require("../middlewares/auth.middlewares");
const upload = require("../middlewares/upload");

// Admin routes
router.get("/", verifyToken, checkRole("admin"), AdminProductController.getProducts);
router.post("/", verifyToken, checkRole("admin"), upload.single("image"), AdminProductController.createProduct);
router.put("/:id", verifyToken, checkRole("admin"), upload.single("image"), AdminProductController.updateProduct);
router.delete("/:id", verifyToken, checkRole("admin"), AdminProductController.deleteProduct);

module.exports = router;
