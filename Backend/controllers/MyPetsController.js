const mongoose = require('mongoose');
const MyPets = mongoose.model('MyPets');

// Get list of pets
exports.getPets = async (req, res) => {
  try {
    const ownerId = req.user.owner_id; // Retrieved from token via authMiddleware
    if (!ownerId) {
      return res.status(400).json({ message: 'Missing owner_id in token' });
    }
    const pets = await MyPets.find({ owner_id: ownerId });
    console.log(`Retrieved pet list for owner_id: ${ownerId}`, pets);
    res.json(pets);
  } catch (error) {
    console.error('Error in getPets:', error);
    res.status(500).json({ message: 'Error retrieving pet list', error: error.message });
  }
};

// Add a new pet
exports.addPet = async (req, res) => {
  try {
    const ownerId = req.user.owner_id || req.body.owner_id; // Check both req.user and req.body
    if (!ownerId) {
      return res.status(403).json({ message: 'Access denied, missing owner_id' });
    }
    const pet = new MyPets({ ...req.body, owner_id: ownerId });
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    console.error('Error in addPet:', error);
    res.status(500).json({ message: 'Error adding pet', error: error.message });
  }
};

// Update a pet
exports.updatePet = async (req, res) => {
  try {
    const { owner_id, name, species, breed, age, medical_history } = req.body;
    if (!owner_id || !name || !species) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const pet = await MyPets.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    if (pet.owner_id !== owner_id) {
      return res.status(403).json({ message: 'Access denied to update' });
    }
    pet.name = name;
    pet.species = species;
    pet.breed = breed;
    pet.age = age;
    pet.medical_history = medical_history;
    if (req.files.image) {
      pet.image = `/uploads/${req.files.image[0].filename}`;
    }
    if (req.files.photos) {
      pet.photos = req.files.photos.map(file => `/uploads/${file.filename}`);
    } else if (req.body.photos) {
      pet.photos = req.body.photos;
    }
    await pet.save();
    res.json(pet);
  } catch (error) {
    console.error('Error in updatePet:', error);
    res.status(500).json({ message: 'Error updating pet', error: error.message });
  }
};

// Delete a pet
exports.deletePet = async (req, res) => {
  try {
    const pet = await MyPets.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    if (pet.owner_id !== req.user.owner_id) {
      return res.status(403).json({ message: 'Access denied to delete' });
    }
    await pet.deleteOne();
    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    console.error('Error in deletePet:', error);
    res.status(500).json({ message: 'Error deleting pet', error: error.message });
  }
};

// Add health record
exports.addHealthRecord = async (req, res) => {
  try {
    const { date, type, description, notes, owner_id } = req.body;
    if (!date || !type || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const pet = await MyPets.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    if (pet.owner_id !== owner_id) {
      return res.status(403).json({ message: 'Access denied to add health record' });
    }
    pet.health_records.push({ date, type, description, notes });
    await pet.save();
    res.json(pet);
  } catch (error) {
    console.error('Error in addHealthRecord:', error);
    res.status(500).json({ message: 'Error adding health record', error: error.message });
  }
};

// Add document
exports.addDocument = async (req, res) => {
  try {
    const { owner_id, name } = req.body;
    if (!name || !req.files.document) {
      return res.status(400).json({ message: 'Missing document name or file' });
    }
    const pet = await MyPets.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    if (pet.owner_id !== owner_id) {
      return res.status(403).json({ message: 'Access denied to add document' });
    }
    const document = {
      name,
      path: `/uploads/${req.files.document[0].filename}`,
      uploaded_at: new Date(),
    };
    pet.documents.push(document);
    await pet.save();
    res.json(pet);
  } catch (error) {
    console.error('Error in addDocument:', error);
    res.status(500).json({ message: 'Error adding document', error: error.message });
  }
};

// Add insurance
exports.addInsurance = async (req, res) => {
  try {
    const { owner_id, policy_number, provider } = req.body;
    if (!policy_number) {
      return res.status(400).json({ message: 'Missing insurance policy number' });
    }
    const pet = await MyPets.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    if (pet.owner_id !== owner_id) {
      return res.status(403).json({ message: 'Access denied to add insurance' });
    }
    const documents = req.files.documents
      ? req.files.documents.map(file => ({
          name: file.originalname,
          path: `/uploads/${file.filename}`,
          uploaded_at: new Date(),
        }))
      : [];
    pet.insurance = { policy_number, provider, documents };
    await pet.save();
    res.json(pet);
  } catch (error) {
    console.error('Error in addInsurance:', error);
    res.status(500).json({ message: 'Error adding insurance', error: error.message });
  }
};