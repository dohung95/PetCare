const MyPets = require("../models/MyPets");

exports.getAllPets = async (req, res) => {
  try {
    const pets = await MyPets.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPetById = async (req, res) => {
  try {
    const pet = await MyPets.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPet = async (req, res) => {
  try {
    const pet = new MyPets(req.body);
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const pet = await MyPets.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const pet = await MyPets.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json({ message: "Pet deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.uploadAvatar = async (req, res) => {
  try {
    console.log("Uploading avatar for pet ID:", req.params.id);
    console.log("Received file:", req.file);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const pet = await MyPets.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    pet.avatar = req.file.path.replace(/\\/g, "/");
    await pet.save();
    res.json(pet);
  } catch (err) {
    console.error("Avatar upload error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.uploadGallery = async (req, res) => {
  try {
    console.log("Uploading gallery for pet ID:", req.params.id);
    console.log("Received file:", req.file);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const pet = await MyPets.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    pet.gallery.push(req.file.path.replace(/\\/g, "/"));
    await pet.save();
    res.json(pet);
  } catch (err) {
    console.error("Gallery upload error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.uploadDocument = async (req, res) => {
  try {
    console.log("Uploading document for pet ID:", req.params.id);
    console.log("Received file:", req.file);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const pet = await MyPets.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    pet.documents.push(req.file.path.replace(/\\/g, "/"));
    await pet.save();
    res.json(pet);
  } catch (err) {
    console.error("Document upload error:", err);
    res.status(500).json({ error: err.message });
  }
};