const express = require('express');
const { getHealthRecords, getHealthRecordById, createHealthRecord, updateHealthRecord, deleteHealthRecord } = require('../controllers/HealthRecordController');
const router = express.Router();

router.route('/').get(getHealthRecords).post(createHealthRecord);
router.route('/:id').get(getHealthRecordById).put(updateHealthRecord).delete(deleteHealthRecord);

module.exports = router;