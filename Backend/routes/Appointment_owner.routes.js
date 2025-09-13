const express = require('express');
const ctrl = require('../controllers/Appointment_owner.controller');
const { validateCreate, validateUpdate } = require('../middlewares/Appointment_owner.middlewares');
const router = express.Router();

router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);
router.post('/', validateCreate, ctrl.create);
router.patch('/:id', validateUpdate, ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
