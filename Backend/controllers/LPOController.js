const LPO = require('../models/LPO.model');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Cấu hình multer để upload hình ảnh
const multer = require('multer');

// Cấu hình nơi lưu trữ và tên file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/lab_results/';
        // Tạo thư mục nếu chưa tồn tại
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

// Bộ lọc file (chỉ cho phép hình ảnh)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận file hình ảnh (jpg, png, gif)'), false);
    }
};

// Khởi tạo multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Giới hạn kích thước file là 5MB
}).array('lab_results', 5); // Cho phép upload tối đa 5 file

// Tạo mới một LPO
const createLPO = async (req, res) => {
    try {
        // Sử dụng middleware upload để xử lý file
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            // Kiểm tra pet_id
            if (!req.body.pet_id) {
                return res.status(400).json({
                    success: false,
                    message: 'Pet ID là bắt buộc'
                });
            }

            // Lấy danh sách đường dẫn file đã upload
            const labResults = req.files ? req.files.map(file => file.path) : [];

            // Tạo mới LPO với dữ liệu từ req.body và lab_results
            const lpoData = {
                ...req.body,
                lab_results: labResults
            };

            const lpo = new LPO(lpoData);
            const savedLPO = await lpo.save();
            // Populate thông tin Pet nếu cần
            const populatedLPO = await LPO.findById(savedLPO._id).populate('pet_id');
            res.status(201).json({
                success: true,
                data: populatedLPO
            });
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
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            // Kiểm tra pet_id nếu có gửi
            if (req.body.pet_id && !mongoose.Types.ObjectId.isValid(req.body.pet_id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Pet ID không hợp lệ'
                });
            }

            // Lấy LPO cũ
            const oldLPO = await LPO.findById(req.params.id);
            if (!oldLPO) {
                return res.status(404).json({
                    success: false,
                    message: 'LPO không tìm thấy'
                });
            }

            // Nếu có file mới thì append thêm
            const newFiles = req.files ? req.files.map(file => file.path) : [];
            const updateData = {
                ...req.body,
                lab_results: [...oldLPO.lab_results, ...newFiles]
            };

            const lpo = await LPO.findByIdAndUpdate(req.params.id, updateData, {
                new: true,
                runValidators: true
            }).populate('pet_id');

            res.status(200).json({
                success: true,
                data: lpo
            });
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
        // Xóa các file hình ảnh liên quan (nếu cần)
        if (lpo.lab_results && lpo.lab_results.length > 0) {
            lpo.lab_results.forEach(filePath => {
                fs.unlink(filePath, (err) => {
                    if (err) console.error(`Lỗi khi xóa file: ${err.message}`);
                });
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

// Xóa 1 file trong lab_results
const deleteLabResultImage = async (req, res) => {
    try {
        const { id, imageIndex } = req.params; // id: LPO id, imageIndex: vị trí trong mảng
        const lpo = await LPO.findById(id);
        if (!lpo) {
            return res.status(404).json({ success: false, message: 'LPO không tìm thấy' });
        }

        if (imageIndex < 0 || imageIndex >= lpo.lab_results.length) {
            return res.status(400).json({ success: false, message: 'Image index không hợp lệ' });
        }

        const filePath = lpo.lab_results[imageIndex];

        // Xóa file vật lý
        fs.unlink(filePath, (err) => {
            if (err) console.error(`Lỗi khi xóa file: ${err.message}`);
        });

        // Cập nhật DB (loại bỏ ảnh khỏi mảng)
        lpo.lab_results.splice(imageIndex, 1);
        await lpo.save();

        res.status(200).json({
            success: true,
            message: 'Ảnh đã được xóa',
            data: lpo
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
    deleteLPO,
    deleteLabResultImage
};