const express = require('express');
const { getAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment } = require('../controllers/AppointmentController');
const router = express.Router();

router.route('/').get(getAppointments).post(createAppointment);
router.route('/:id').get(getAppointmentById).put(updateAppointment).delete(deleteAppointment);

module.exports = router;