const express = require('express');
const router = express.Router();
const shelterPetController = require('../controllers/shelterPetController');

// Route to create a new pet
router.post('/shelter-pets', shelterPetController.createShelterPet);

// Route to get all pets
router.get('/shelter-pets', shelterPetController.getAllShelterPets);

// Route to get a single pet by ID
router.get('/shelter-pets/:id', shelterPetController.getShelterPetById);

// Route to update a pet by ID
router.put('/shelter-pets/:id', shelterPetController.updateShelterPet);

// Route to delete a pet by ID
router.delete('/shelter-pets/:id', shelterPetController.deleteShelterPet);

module.exports = router;