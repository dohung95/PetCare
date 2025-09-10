const Owner = require('../models/Owner');

// @desc    Get all owners
// @route   GET /api/owners
// @access  Public
exports.getOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.status(200).json({ success: true, data: owners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single owner
// @route   GET /api/owners/:id
// @access  Public
exports.getOwnerById = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) {
      return res.status(404).json({ success: false, message: 'Owner not found' });
    }
    res.status(200).json({ success: true, data: owner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new owner
// @route   POST /api/owners
// @access  Private
exports.createOwner = async (req, res) => {
  try {
    const newOwner = await Owner.create(req.body);
    res.status(201).json({ success: true, data: newOwner });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update owner
// @route   PUT /api/owners/:id
// @access  Private
exports.updateOwner = async (req, res) => {
  try {
    const updatedOwner = await Owner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedOwner) {
      return res.status(404).json({ success: false, message: 'Owner not found' });
    }
    res.status(200).json({ success: true, data: updatedOwner });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete owner
// @route   DELETE /api/owners/:id
// @access  Private
exports.deleteOwner = async (req, res) => {
  try {
    const deletedOwner = await Owner.findByIdAndDelete(req.params.id);
    if (!deletedOwner) {
      return res.status(404).json({ success: false, message: 'Owner not found' });
    }
    res.status(200).json({ success: true, message: 'Owner deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};