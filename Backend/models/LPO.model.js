const mongoose = require('mongoose');

// Định nghĩa schema
const lpoSchema = new mongoose.Schema({
    pet_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',  // Tham chiếu đến model Pet
        // required: [true, 'Pet ID là bắt buộc']  // Yêu cầu không được để trống
    },
    diagnosis: {
        type: String,
        required: [true, 'Diagnosis là bắt buộc'],  // Yêu cầu không được để trống
        trim: true,  // Tự động loại bỏ khoảng trắng thừa
    },
    prescription: {
        type: String,
        required: true,
        trim: true,    
    },
    symptoms: {
        type: String,
        required: true,
        trim: true
    },
    past_treatments: {
        type: String,
        trim: true,
        default: ''  // Giá trị mặc định nếu không cung cấp
    },
    lab_results: {
        type: String,
        trim: true,
        default: ''
    }
}, { 
    timestamps: true  // Tự động thêm createdAt và updatedAt
});

// Thêm index cho các trường thường query (tùy chọn)
lpoSchema.index({ diagnosis: 'text', symptoms: 'text' });  // Text index cho tìm kiếm full-text

// Compile schema thành model
const LPO = mongoose.model('LPO', lpoSchema);  // Tên model là 'LPOS' (số nhiều mặc định)

// Export model để sử dụng ở nơi khác
module.exports = LPO;