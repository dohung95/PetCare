const express = require('express');
const router = express.Router();
const lpoController = require('../controllers/LPOController'); // Giả sử controller ở file lpoController.js

// Định nghĩa các route
router.post('/', lpoController.createLPO); // Tạo mới LPO
router.get('/', lpoController.getAllLPOs); // Lấy danh sách tất cả LPO
router.get('/:id', lpoController.getLPOById); // Lấy chi tiết một LPO
router.put('/:id', lpoController.updateLPO); // Cập nhật một LPO
router.delete('/:id', lpoController.deleteLPO); // Xóa một LPO

module.exports = router;