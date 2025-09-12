const express = require('express');
const ctrl = require('../controllers/Feedback.controller');
const router = express.Router();

router.get('/', ctrl.list);
router.get('/summary', ctrl.summary);
router.post('/', ctrl.create);
router.patch('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;