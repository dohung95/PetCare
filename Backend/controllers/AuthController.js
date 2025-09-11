const Owner = require('../models/Owner');
const jwt = require('jsonwebtoken');

// Ký access token
function signAccessToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '7d', algorithm: 'HS256' }
  );
}

// @desc    Register (Owner)
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Yêu cầu các trường bắt buộc (khớp với schema/FE)
    if (!name || !email || !password || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, password, phone and address are required'
      });
    }

    // Check email tồn tại
    const existed = await Owner.findOne({ email });
    if (existed) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    // Tạo user (password sẽ hash trong pre('save'))
    const user = await Owner.create({ name, email, password, phone, address });

    // Ký JWT
    const token = signAccessToken(user);

    // Trả về: KHÔNG gửi password
    return res.status(201).json({
      success: true,
      message: 'Registered successfully',
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role, // nếu model có default 'owner'
      }
    });
  } catch (error) {
    // Lỗi validate của mongoose → 400
    if (error?.name === 'ValidationError') {
      const details = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: 'Validation error', details });
    }
    // Duplicate email (phòng trường hợp bên trên không bắt kịp)
    if (error?.code === 11000 && error?.keyPattern?.email) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }
    // Còn lại → 500
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login (Owner)
// @route   POST /api/auth/signin
// @access  Public
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body; // FE gửi plain password
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await Owner.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ success: false, message: 'Invalid email or password' });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ success: false, message: 'Invalid email or password' });

    const token = signAccessToken(user);
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user (JWT required)
// @route   GET /api/auth/me
// @access  Private
exports.me = async (req, res) => {
  try {
    const user = await Owner.findById(req.user.sub).lean();
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    delete user.password;
    return res.json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};