const Store = require('../models/ManageStore');

// Create a store item with image upload
exports.createStoreItem = async (req, res) => {
  try {
    const { name, category, price, description, stock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const storeItem = new Store({
      name,
      category,
      price,
      description,
      image,
      stock,
    });
    await storeItem.save();
    res.status(201).json(storeItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating store item', error });
  }
};

// Get all store items
exports.getAllStoreItems = async (req, res) => {
  try {
    const storeItems = await Store.find();
    res.status(200).json(storeItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching store items', error });
  }
};

// Update a store item with optional image upload
exports.updateStoreItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, description, stock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image; // Keep old image if no new upload
    const updatedData = { name, category, price, description, stock, image };
    const updatedStoreItem = await Store.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedStoreItem) {
      return res.status(404).json({ message: 'Store item not found' });
    }
    res.status(200).json(updatedStoreItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating store item', error });
  }
};

// Delete a store item
exports.deleteStoreItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStoreItem = await Store.findByIdAndDelete(id);
    if (!deletedStoreItem) {
      return res.status(404).json({ message: 'Store item not found' });
    }
    res.status(200).json({ message: 'Store item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting store item', error });
  }
};

// Buy item and reduce stock
exports.buyItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const item = await Store.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (item.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    item.stock -= quantity;
    await item.save();
    res.status(200).json({ message: 'Purchase successful', updatedItem: item });
  } catch (error) {
    res.status(500).json({ message: 'Error processing purchase', error });
  }
};