const LPO = require('../models/LPO.model'); // Giả sử model ở file lpoModel.js

// Tạo mới một LPO
const createLPO = async (req, res) => {
    try {
        // Kiểm tra xem pet_id có hợp lệ hay không (nếu required)
        if (!req.body.pet_id) {
            return res.status(400).json({
                success: false,
                message: 'Pet ID là bắt buộc'
            });
        }
        const lpo = new LPO(req.body);
        const savedLPO = await lpo.save();
        // Populate thông tin Pet nếu cần
        const populatedLPO = await LPO.findById(savedLPO._id).populate('pet_id');
        res.status(201).json({
            success: true,
            data: populatedLPO
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Lấy danh sách tất cả LPO
const getAllLPOs = async (req, res) => {
    try {
        const lpos = await LPO.find().populate('pet_id'); // Populate để lấy thông tin Pet
        res.status(200).json({
            success: true,
            data: lpos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Lấy chi tiết một LPO theo ID
const getLPOById = async (req, res) => {
    try {
        const lpo = await LPO.findById(req.params.id).populate('pet_id');
        if (!lpo) {
            return res.status(404).json({
                success: false,
                message: 'LPO không tìm thấy'
            });
        }
        res.status(200).json({
            success: true,
            data: lpo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Cập nhật một LPO
const updateLPO = async (req, res) => {
    try {
        // Kiểm tra xem pet_id có hợp lệ nếu được cung cấp
        if (req.body.pet_id && !mongoose.Types.ObjectId.isValid(req.body.pet_id)) {
            return res.status(400).json({
                success: false,
                message: 'Pet ID không hợp lệ'
            });
        }
        const lpo = await LPO.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Trả về document đã cập nhật
            runValidators: true // Chạy validation của schema
        }).populate('pet_id');
        if (!lpo) {
            return res.status(404).json({
                success: false,
                message: 'LPO không tìm thấy'
            });
        }
        res.status(200).json({
            success: true,
            data: lpo
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Xóa một LPO
const deleteLPO = async (req, res) => {
    try {
        const lpo = await LPO.findByIdAndDelete(req.params.id);
        if (!lpo) {
            return res.status(404).json({
                success: false,
                message: 'LPO không tìm thấy'
            });
        }
        res.status(200).json({
            success: true,
            message: 'LPO đã được xóa'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createLPO,
    getAllLPOs,
    getLPOById,
    updateLPO,
    deleteLPO
};