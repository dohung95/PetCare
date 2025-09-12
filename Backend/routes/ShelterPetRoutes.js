const express = require('express');
const router = express.Router();
const shelterPetController = require('../controllers/ShelterPetController');

// Route to create a new pet
router.post('/', shelterPetController.createShelterPet);

// Route to get all pets
router.get('/', shelterPetController.getAllShelterPets);

// Route to get a single pet by ID
router.get('/:id', shelterPetController.getShelterPetById);

// Route to update a pet by ID
router.put('/:id', shelterPetController.updateShelterPet);

// Route to delete a pet by ID
router.delete('/:id', shelterPetController.deleteShelterPet);

module.exports = router;