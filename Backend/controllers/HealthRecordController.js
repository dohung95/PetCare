const HealthRecord = require('../models/HealthRecord');

exports.getHealthRecords = async (req, res) => {
  try {
    const HealthRecords = await HealthRecord.find();
    res.status(200).json({success: true, data: HealthRecords});

  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

exports.getHealthRecordById = async (req, res) => {
  try {
    const HealthRecord = await HealthRecord.findById(req.params.id);
    if (!record){
      return res.status(404).json({success: true, data: record})
    }
  } catch (error) {
    res.status(500).json({success: false, message: error.message}); 
  }
};

exports.createHealthRecord = async (req, res) => {
  try {
    const newHealthRecord = await HealthRecord.create(req.body);
    res.status(201).json({ success: true, data: newHealthRecord });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateHealthRecord = async (req, res) => {
  try {
    const updatedHealthRecord = await HealthRecord.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedHealthRecord) {
      return res.status(404).json({ success: false, message: 'HealthRecord not found' });
    }
    res.status(200).json({ success: true, data: updatedHealthRecord });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteHealthRecord = async (req, res) => {
  try {
    const deletedHealthRecord = await HealthRecord.findByIdAndDelete(req.params.id);
    if (!deletedHealthRecord) {
      return res.status(404).json({ success: false, message: 'HealthRecord not found' });
    }
    res.status(200).json({ success: true, message: 'HealthRecord deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};