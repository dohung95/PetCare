const Shelter = require('../models/Shelter');

// --- SHELTER CONTROLLERS ---

// Create a new shelter
exports.createShelter = async (req, res) => {
  try {
    const newShelter = new Shelter(req.body);
    await newShelter.save();
    res.status(201).json(newShelter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all shelters
exports.getAllShelters = async (req, res) => {
  try {
    const shelters = await Shelter.find();
    res.status(200).json(shelters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
