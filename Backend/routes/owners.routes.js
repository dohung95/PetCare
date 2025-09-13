// routes/owners.routes.js
const express = require('express');
const { authRequired } = require('../middlewares/auth.middlewares');
const { validateOwnerUpdate } = require('../middlewares/ownerProfile.middlewares');
const ctrl = require('../controllers/ownerProfile.controller');
const router = express.Router();

// Admin hoặc chính chủ mới cho sửa qua /owners/:id
router.put('/:id', authRequired, validateOwnerUpdate, ctrl.updateById);

module.exports = router;
