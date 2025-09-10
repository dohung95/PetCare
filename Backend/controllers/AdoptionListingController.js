const AdoptionListing = require('../models/AdoptionListing');

exports.getAdoptionListings = async (req, res) => {
  try {
    const AdoptionListings = await AdoptionListing.find();
    res.status(200).json({success: true, data: AdoptionListings});

  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

exports.getAdoptionListingById = async (req, res) => {
  try {
    const AdoptionListing = await AdoptionListing.findById(req.params.id);
    if (!AdoptionListing){
      return res.status(404).json({success: true, data: AdoptionListing})
    }
  } catch (error) {
    res.status(500).json({success: false, message: error.message}); 
  }
};

exports.createAdoptionListing = async (req, res) => {
  try {
    const newAdoptionListing = await AdoptionListing.create(req.body);
    res.status(201).json({ success: true, data: newAdoptionListing });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateAdoptionListing = async (req, res) => {
  try {
    const updatedAdoptionListing = await Owner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedAdoptionListing) {
      return res.status(404).json({ success: false, message: 'AdoptionListing not found' });
    }
    res.status(200).json({ success: true, data: updatedAdoptionListing });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteAdoptionListing = async (req, res) => {
  try {
    const deletedAdoptionListing = await Owner.findByIdAndDelete(req.params.id);
    if (!deletedAdoptionListing) {
      return res.status(404).json({ success: false, message: 'Owner not found' });
    }
    res.status(200).json({ success: true, message: 'AdoptionListing deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};