const Pet = require('../models/Pet');

// @desc    Lấy tất cả thú cưng
// @route   GET /api/pets
// @access  Public
exports.getPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json({ success: true, data: pets });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Lấy một thú cưng theo ID
// @route   GET /api/pets/:id
// @access  Public
exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            // Khi không tìm thấy pet, trả về status 404 và success: false
            return res.status(404).json({ success: false, message: 'Pet not found' });
        }
        res.status(200).json({ success: true, data: pet });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message }); 
    }
};

// @desc    Tạo một thú cưng mới
// @route   POST /api/pets
// @access  Public
exports.createPet = async (req, res) => {
    try {
        const newPet = await Pet.create(req.body);
        res.status(201).json({ success: true, data: newPet });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Cập nhật một thú cưng theo ID
// @route   PUT /api/pets/:id
// @access  Public
exports.updatePet = async (req, res) => {
    try {
        // Sửa lỗi: Sử dụng Pet.findByIdAndUpdate thay vì Owner.findByIdAndUpdate
        const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedPet) {
            return res.status(404).json({ success: false, message: 'Pet not found' });
        }
        res.status(200).json({ success: true, data: updatedPet });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Xóa một thú cưng theo ID
// @route   DELETE /api/pets/:id
// @access  Public
exports.deletePet = async (req, res) => {
    try {
        // Sửa lỗi: Sử dụng Pet.findByIdAndDelete thay vì Owner.findByIdAndDelete
        const deletedPet = await Pet.findByIdAndDelete(req.params.id);
        if (!deletedPet) {
            return res.status(404).json({ success: false, message: 'Pet not found' });
        }
        res.status(200).json({ success: true, message: 'Pet deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
