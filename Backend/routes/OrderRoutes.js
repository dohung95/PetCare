const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

// Tạo order mới
router.post("/", orderController.createOrder);

module.exports = router;
