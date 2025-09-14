
const express = require('express');
const router = express.Router();

const LogsController = require('../controllers/LogController');

router.get('/:id/log', LogsController.getPetLogs);
router.post('/:id/log', LogsController.addLog);
router.put('/:id/log/:logId', LogsController.updateLog);
router.delete('/:id/log/:logId', LogsController.deleteLog);

module.exports = router;