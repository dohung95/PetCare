const router = require('express').Router();
const { signup, signin, me } = require('../controllers/AuthController');
const { verifyToken } = require('../middlewares/auth.middlewares');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Owner = require('../models/Owner');         // <-- DÙNG Owner
const transporter = require('../utils/mailer');

// Core auth
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/me', verifyToken, me);

// Forgot password
router.post('/forgot-password', async (req, res) => {
  try {
    const rawEmail = (req.body.email || '').trim().toLowerCase();
    if (!rawEmail) return res.status(400).json({ message: 'Email is required' });

    // (Ẩn tồn tại email)
    const genericMsg = 'If this email exists, a reset link has been sent.';
    const owner = await Owner.findOne({ email: rawEmail });
    if (!owner) return res.json({ message: genericMsg });

    const token = crypto.randomBytes(32).toString('hex');
    owner.resetPasswordToken = token;
    owner.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1h
    await owner.save();

    const FRONTEND_URL = 'http://localhost:3000';
    const resetLink = `${FRONTEND_URL}/reset-password/${token}`;

    await transporter.sendMail({
      from: `"PetCare" <${process.env.EMAIL_USER}>`,
      to: owner.email,
      subject: 'Reset your password',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:16px">
          <h2>Reset your password</h2>
          <p>Hello ${owner.name || 'there'},</p>
          <p>Click the button below to set a new password (expires in 1 hour):</p>
          <p style="margin:16px 0">
            <a href="${resetLink}" style="background:#0d6efd;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">
              Set New Password
            </a>
          </p>
          <p>Or paste this link: <a href="${resetLink}">${resetLink}</a></p>
        </div>
      `,
    });

    return res.json({ message: genericMsg });
  } catch (err) {
    console.error('forgot-password error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Reset password
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { password } = req.body || {};
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    console.log("Incoming token:", req.params.token);
    const owner = await Owner.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    console.log("Matched owner:", owner);

    if (!owner) {
      return res.status(400).json({ message: 'Token invalid or expired' });
    }

    owner.password = await bcrypt.hash(password, 10);
    owner.resetPasswordToken = undefined;
    owner.resetPasswordExpires = undefined;
    await owner.save();

    return res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('reset-password error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// DEBUG: kiểm tra token nhanh
router.get('/check-token/:token', async (req, res) => {
  try {
    const owner = await Owner.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    }, { email: 1, resetPasswordExpires: 1 });

    if (!owner) return res.status(404).json({ valid: false, reason: 'invalid-or-expired' });
    return res.json({ valid: true, email: owner.email, expiresAt: owner.resetPasswordExpires });
  } catch (e) {
    return res.status(500).json({ valid: false, error: e.message });
  }
});


module.exports = router;
