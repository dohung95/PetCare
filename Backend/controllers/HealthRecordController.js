const HealthRecord = require('../models/HealthRecord');

exports.getHealthRecords = async (req, res) => {
  try {
    const HealthRecords = await HealthRecord.find()
      .populate('pet_id', 'name') // Lấy name từ Pet
    // Transform data to include pet_name and vet_name for frontend
    const transformedRecords = HealthRecords.map(record => ({
      ...record._doc,
      pet_name: record.pet_id ? record.pet_id.name : null
    }));

    res.status(200).json({ success: true, data: transformedRecords });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Sửa lỗi trong getHealthRecordById
exports.getHealthRecordById = async (req, res) => {
  try {
    const record = await HealthRecord.findById(req.params.id)
      .populate('pet_id', 'name')
      .populate('vet_id', 'name');
    if (!record) {
      return res.status(404).json({ success: false, message: 'Health record not found' });
    }
    const transformedRecord = {
      ...record._doc,
      pet_name: record.pet_id ? record.pet_id.name : null,
      vet_name: record.vet_id ? record.vet_id.name : null
    };
    res.status(200).json({ success: true, data: transformedRecord });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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