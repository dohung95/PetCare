

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

// Update a pet by ID
exports.updateShelterPet = async (req, res) => {
  try {
    const updatedPet = await ShelterPet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPet) return res.status(404).json({ message: 'Pet not found' });
    res.status(200).json(updatedPet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

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

// Create a new pet
exports.createShelterPet = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      // lưu đường dẫn ảnh vào DB
      data.image = `/uploads/${req.file.filename}`;
    }

    const newShelterPet = await ShelterPet.create(data);
    res.status(201).json(newShelterPet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a pet by ID
exports.updateShelterPet = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }

    const updatedPet = await ShelterPet.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    if (!updatedPet) return res.status(404).json({ message: "Pet not found" });
    res.status(200).json(updatedPet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// router.put("/shelter_pets/:id", async (req, res) => {
//   try {
//     const pet = await ShelterPet.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true } // ✅ trả về bản ghi đã update
//     );
//     res.json(pet);
//   } catch (err) {
//     res.status(500).json({ error: "Update pet failed" });
//   }
// });