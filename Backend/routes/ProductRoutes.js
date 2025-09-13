const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

// Public routes
router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProductById);

module.exports = router;
