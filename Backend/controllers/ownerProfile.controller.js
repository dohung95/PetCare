const Owner = require('../models/Owner');

function toPublic(ownerDoc) {
  if (!ownerDoc) return null;
  return {
    id: ownerDoc._id,
    name: ownerDoc.name,
    email: ownerDoc.email,
    phone: ownerDoc.phone,
    address: ownerDoc.address,
    role: ownerDoc.role,
    createdAt: ownerDoc.createdAt,
    updatedAt: ownerDoc.updatedAt,
  };
}

// GET /api/user/profile  → trả về chính chủ (dựa vào JWT)
exports.getMyProfile = async (req, res) => {
  const me = await Owner.findById(req.user.id).lean();
  if (!me) return res.status(404).json({ success:false, message:'User not found' });
  return res.json({ success:true, data: toPublic(me) });
};

// PUT /api/user/profile  → cập nhật chính chủ
exports.updateMyProfile = async (req, res) => {
  try {
    const updates = req._sanitizedBody || {};
    const updated = await Owner.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).lean();
    if (!updated) return res.status(404).json({ success:false, message:'User not found' });
    return res.json({ success:true, message:'Profile updated', data: toPublic(updated) });
  } catch (err) {
    // duplicate email
    if (err?.code === 11000 && err?.keyPattern?.email) {
      return res.status(409).json({ success:false, message:'Email already registered' });
    }
    if (err?.name === 'ValidationError') {
      return res.status(400).json({ success:false, message:'Validation error', errors: Object.values(err.errors).map(e=>e.message) });
    }
    return res.status(500).json({ success:false, message: err.message });
  }
};

// (Optional) Admin/Self: PUT /api/owners/:id
exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;

    // nếu không phải admin thì chỉ cho update chính mình
    if (req.user.role !== 'admin' && String(req.user.id) !== String(id)) {
      return res.status(403).json({ success:false, message:'Forbidden' });
    }

    const updates = req._sanitizedBody || {};
    const updated = await Owner.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).lean();
    if (!updated) return res.status(404).json({ success:false, message:'User not found' });
    return res.json({ success:true, message:'Owner updated', data: toPublic(updated) });
  } catch (err) {
    if (err?.code === 11000 && err?.keyPattern?.email) {
      return res.status(409).json({ success:false, message:'Email already registered' });
    }
    if (err?.name === 'ValidationError') {
      return res.status(400).json({ success:false, message:'Validation error', errors: Object.values(err.errors).map(e=>e.message) });
    }
    return res.status(500).json({ success:false, message: err.message });
  }
};
