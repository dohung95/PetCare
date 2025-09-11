const express = require('express');
const router = express.Router();
const shelterController = require('../controllers/ShelterController');

// Define routes for shelters
router.post('/shelters', shelterController.createShelter);
router.get('/shelters', shelterController.getAllShelters);

module.exports = router;