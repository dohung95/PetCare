// Import the Mongoose Appointment model to interact with the database
const Appointment = require('../models/Appointment');

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Public
exports.getAppointments = async (req, res) => {
  try {
    // Corrected variable name for clarity and consistency
    const appointments = await Appointment.find();
    res.status(200).json({ success: true, data: appointments });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get a single appointment by ID
// @route   GET /api/appointments/:id
// @access  Public
exports.getAppointmentById = async (req, res) => {
  try {
    // Use a lowercase variable name to avoid shadowing the model
    const appointment = await Appointment.findById(req.params.id);

    // If no appointment is found, return a 404 response
    if (!appointment) {
      // It's important to set success to false for a "not found" response
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // If an appointment is found, send a successful response with the data
    res.status(200).json({ success: true, data: appointment });

  } catch (error) {
    // Send a 500 error for server-side issues (e.g., invalid ID format)
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Public
exports.createAppointment = async (req, res) => {
  try {
    const newAppointment = await Appointment.create(req.body);
    res.status(201).json({ success: true, data: newAppointment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update an appointment
// @route   PUT /api/appointments/:id
// @access  Public
exports.updateAppointment = async (req, res) => {
  try {
    // CORRECTED: Use the Appointment model instead of the Owner model
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true // Run schema validators on update
    });

    if (!updatedAppointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    res.status(200).json({ success: true, data: updatedAppointment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete an appointment
// @route   DELETE /api/appointments/:id
// @access  Public
exports.deleteAppointment = async (req, res) => {
  try {
    // CORRECTED: Use the Appointment model instead of the Owner model
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!deletedAppointment) {
      // CORRECTED: Consistent and correct "not found" message
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
