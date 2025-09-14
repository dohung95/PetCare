const ShelterPet = require('../models/ShelterPet');
// Assuming CareLogSchema is a subdocument on ShelterPet,
// this import is for reference and might not be used directly in the controller
// since we're interacting with it via the parent ShelterPet model.
const CareLogSchema = require('../models/CareLogSchema');

// Basic CRUD Operations
// ---
// Create a new pet with optional image upload
exports.createShelterPet = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }
    const newShelterPet = await ShelterPet.create(data);
    res.status(201).json(newShelterPet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all pets
exports.getAllShelterPets = async (req, res) => {
  try {
    const pets = await ShelterPet.find();
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single pet by ID
exports.getShelterPetById = async (req, res) => {
  try {
    const pet = await ShelterPet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a pet by ID with optional image upload
exports.updateShelterPet = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }
    const updatedPet = await ShelterPet.findByIdAndUpdate(
      req.params.id,
      data, // Correctly pass the data object for general updates
      { new: true, runValidators: true } // Return updated doc and run schema validators
    );
    if (!updatedPet) return res.status(404).json({ message: "Pet not found" });
    res.status(200).json(updatedPet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a pet by ID
exports.deleteShelterPet = async (req, res) => {
  try {
    const deletedPet = await ShelterPet.findByIdAndDelete(req.params.id);
    if (!deletedPet) return res.status(404).json({ message: 'Pet not found' });
    res.status(200).json({ message: 'Pet successfully deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---
// Additional Functions
// ---
// Toggle availability (Available <-> Adopted)
exports.toggleAvailability = async (req, res) => {
  try {
    const pet = await ShelterPet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    pet.available = !pet.available;
    await pet.save();
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get care logs for a specific pet, sorted by creation date
exports.getCareLogs = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await ShelterPet.findById(id).populate({
      path: 'logs',
      options: { sort: { createdAt: -1 } }
    });
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    return res.json(pet.logs);
  } catch (err) {
    console.error('Error in getCareLogs:', err);
    return res.status(500).json({ message: err.message });
  }
};

// Add a new care log using the efficient $push operator
exports.addCareLog = async (req, res) => {
  try {
    const { type, details, time } = req.body;

    if (!type || !details) {
      return res.status(400).json({ message: "Missing type or details field" });
    }

    const result = await ShelterPet.findByIdAndUpdate(
      req.params.id,
      { $push: { logs: { type, details, time } } },
      { new: true } // Returns the updated document
    );

    if (!result) return res.status(404).json({ message: "Pet not found" });

    // Find and return the newly added log from the updated document
    const addedLog = result.logs.find(log => log.type === type && log.details === details);
    res.status(201).json(addedLog);
  } catch (err) {
    console.error("Error adding care log:", err);
    res.status(500).json({ message: "Failed to add care log", error: err.message });
  }
};

// Update a specific care log
exports.updateCareLog = async (req, res) => {
  const { id, logId } = req.params;
  const { text } = req.body;

  try {
    const updatedLog = await ShelterPet.findOneAndUpdate(
      { _id: id, "logs._id": logId },
      { "$set": { "logs.$.text": text } },
      { new: true }
    );
    if (!updatedLog) {
      return res.status(404).json({ message: 'Log not found' });
    }
    return res.json(updatedLog);

  } catch (err) {
    console.error('Error in updateCareLog:', err);
    return res
      .status(500)
      .json({ message: err.message });
  }
};
