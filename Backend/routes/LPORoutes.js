const express = require('express');
const router = express.Router();
const lpoController = require('../controllers/LPOController');

// Định nghĩa các route
router.post('/', lpoController.createLPO); // Tạo mới LPO (có upload file)
router.get('/', lpoController.getAllLPOs); // Lấy danh sách tất cả LPO
router.get('/:id', lpoController.getLPOById); // Lấy chi tiết một LPO
router.put('/:id', lpoController.updateLPO); // Cập nhật một LPO (có upload file)
router.delete('/:id', lpoController.deleteLPO); // Xóa một LPO
router.delete('/:id/lab_results/:imageIndex', lpoController.deleteLabResultImage); // Xóa 1 ảnh trong lab_results theo index

module.exports = router;