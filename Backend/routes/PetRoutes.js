const express = require('express');
const { getPets, getPetById, createPet, updatePet, deletePet } = require('../controllers/PetController');
const router = express.Router();

router.route('/').get(getPets).post(createPet);
router.route('/:id').get(getPetById).put(updatePet).delete(deletePet);

module.exports = router;