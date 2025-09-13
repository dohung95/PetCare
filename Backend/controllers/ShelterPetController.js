const ShelterPet = require('../models/ShelterPet');

// Create a new pet
exports.createShelterPet = async (req, res) => {
  try {
    const newShelterPet = await ShelterPet.create(req.body);
    res.status(201).json(newShelterPet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all pets
exports.getAllShelterPets = async (req, res) => {
  try {
    const pets = await ShelterPet.find().populate('shelter_id'); // Populate the shelter details
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single pet by ID
exports.getShelterPetById = async (req, res) => {
  try {
    const pet = await ShelterPet.findById(req.params.id).populate('shelter_id');
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a pet by ID
exports.updateShelterPet = async (req, res) => {
  try {
    const updatedPet = await ShelterPet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json(updatedPet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a pet by ID
exports.deleteShelterPet = async (req, res) => {
  try {
    const deletedPet = await ShelterPet.findByIdAndDelete(req.params.id);
    if (!deletedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json({ message: 'Pet successfully deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};