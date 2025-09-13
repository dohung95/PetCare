const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const MyPets = mongoose.model('MyPets');


// Cấu hình Multer cho ảnh và tài liệu
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Chỉ cho phép file .jpg, .jpeg, .webp, .png, .pdf!'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
});

// Middleware xác thực
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // Thay bằng logic JWT thực tế
  next();
};

// Lấy danh sách thú cưng
router.get('/', authMiddleware, async (req, res) => {
  try {
    const ownerId = req.query.owner_id;
    const pets = await MyPets.find({ owner_id: ownerId });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách thú cưng', error: error.message });
  }
});

// Thêm thú cưng mới
router.post('/', authMiddleware, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'photos', maxCount: 10 }]), async (req, res) => {
  try {
    const { owner_id, name, species, breed, age, medical_history } = req.body;
    if (!owner_id || !name || !species) {
      return res.status(400).json({ message: 'Thiếu các trường bắt buộc' });
    }
    const image = req.files.image ? `/uploads/${req.files.image[0].filename}` : '';
    const photos = req.files.photos ? req.files.photos.map(file => `/uploads/${file.filename}`) : [];
    const pet = new MyPets({ owner_id, name, species, breed, age, image, photos, medical_history });
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    console.error('Lỗi khi thêm thú cưng:', error);
    res.status(500).json({ message: 'Lỗi khi thêm thú cưng', error: error.message });
  }
});

// Cập nhật thú cưng
router.put('/:id', authMiddleware, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'photos', maxCount: 10 }]), async (req, res) => {
  try {
    const { owner_id, name, species, breed, age, medical_history } = req.body;
    const image = req.files.image ? `/uploads/${req.files.image[0].filename}` : req.body.image;
    const photos = req.files.photos ? req.files.photos.map(file => `/uploads/${file.filename}`) : req.body.photos;
    const pet = await MyPets.findOneAndUpdate(
      { _id: req.params.id, owner_id },
      { name, species, breed, age, image, photos, medical_history },
      { new: true }
    );
    if (!pet) {
      return res.status(404).json({ message: 'Không tìm thấy thú cưng hoặc không có quyền' });
    }
    res.json(pet);
  } catch (error) {
    console.error('Lỗi khi cập nhật thú cưng:', error);
    res.status(500).json({ message: 'Lỗi khi cập nhật thú cưng', error: error.message });
  }
});

// Xóa thú cưng
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const pet = await MyPets.findOneAndDelete({ _id: req.params.id, owner_id: req.query.owner_id });
    if (!pet) {
      return res.status(404).json({ message: 'Không tìm thấy thú cưng hoặc không có quyền' });
    }
    res.json({ message: 'Xóa thú cưng thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa thú cưng', error: error.message });
  }
});

// Thêm hồ sơ sức khỏe
router.post('/:id/health-records', authMiddleware, async (req, res) => {
  try {
    const { date, type, description, notes } = req.body;
    const pet = await MyPets.findOne({ _id: req.params.id, owner_id: req.body.owner_id });
    if (!pet) {
      return res.status(404).json({ message: 'Không tìm thấy thú cưng hoặc không có quyền' });
    }
    pet.health_records.push({ date, type, description, notes });
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm hồ sơ sức khỏe', error: error.message });
  }
});

// Thêm tài liệu
router.post('/:id/documents', authMiddleware, upload.single('document'), async (req, res) => {
  try {
    const { name, owner_id } = req.body;
    const pet = await MyPets.findOne({ _id: req.params.id, owner_id });
    if (!pet) {
      return res.status(404).json({ message: 'Không tìm thấy thú cưng hoặc không có quyền' });
    }
    const document = {
      name,
      path: req.file ? `/uploads/${req.file.filename}` : '',
    };
    pet.documents.push(document);
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm tài liệu', error: error.message });
  }
});

// Thêm thông tin bảo hiểm
router.post('/:id/insurance', authMiddleware, upload.array('documents', 5), async (req, res) => {
  try {
    const { owner_id, policy_number, provider } = req.body;
    const pet = await MyPets.findOne({ _id: req.params.id, owner_id });
    if (!pet) {
      return res.status(404).json({ message: 'Không tìm thấy thú cưng hoặc không có quyền' });
    }
    const documents = req.files ? req.files.map(file => ({
      name: file.originalname,
      path: `/uploads/${file.filename}`,
    })) : [];
    pet.insurance = { policy_number, provider, documents };
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm thông tin bảo hiểm', error: error.message });
  }
});

module.exports = router;