// controllers/Feedback.controller.js
const Feedback = require('../models/Feedback');

function pick(obj, keys) {
  const out = {};
  for (const k of keys) if (obj[k] !== undefined) out[k] = obj[k];
  return out;
}

/**
 * POST /api/feedbacks
 * Body: { name, email, phone, type, rating, message, meta, isApproved? }
 */
exports.create = async (req, res, next) => {
  try {
    const data = pick(req.body, [
      'name',
      'email',
      'phone',
      'type',
      'rating',
      'message',
      'meta',
      'isApproved', // nếu muốn cho phép set từ admin
    ]);

    // gắn user nếu đã đăng nhập (có middleware auth set req.user)
    if (req.user && req.user.id) data.user = req.user.id;

    // validate rating
    const r = Number(data.rating);
    if (!(r >= 1 && r <= 5)) {
      return res.status(400).json({ success: false, message: 'rating must be in [1..5]' });
    }
    data.rating = r;

    const doc = await Feedback.create(data);
    return res.status(201).json({ success: true, data: doc.toPublicJSON() });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/feedbacks
 * Query: rating, minRating, maxRating, isApproved, type, q, page, limit, sort
 */
exports.list = async (req, res, next) => {
  try {
    const {
      rating,
      minRating,
      maxRating,
      isApproved,
      type,
      q,
      page = 1,
      limit = 20,
      sort = '-_id',
    } = req.query;

    const filter = {};

    if (isApproved === 'true') filter.isApproved = true;
    if (isApproved === 'false') filter.isApproved = false;

    if (type) filter.type = type;

    if (rating != null) filter.rating = Number(rating);
    if (minRating != null || maxRating != null) {
      filter.rating = filter.rating || {};
      if (minRating != null) filter.rating.$gte = Number(minRating);
      if (maxRating != null) filter.rating.$lte = Number(maxRating);
    }

    if (q) {
      // model không có title/comment → dùng message + name + email
      filter.$or = [
        { message: { $regex: q, $options: 'i' } },
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(1, Number(page));
    const perPage = Math.min(100, Math.max(1, Number(limit)));

    const [items, total] = await Promise.all([
      Feedback.find(filter)
        .sort(sort)
        .skip((pageNum - 1) * perPage)
        .limit(perPage),
      Feedback.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: items.map((d) => d.toPublicJSON()),
      pagination: {
        total,
        page: pageNum,
        limit: perPage,
        pages: Math.ceil(total / perPage),
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/feedbacks/:id
 * Body cho phép: rating, message, isApproved, name, email, phone, type, meta
 */
exports.update = async (req, res, next) => {
  try {
    const allowed = ['rating', 'message', 'isApproved', 'name', 'email', 'phone', 'type', 'meta'];
    const updates = pick(req.body, allowed);

    if (updates.rating != null) {
      const r = Number(updates.rating);
      if (!(r >= 1 && r <= 5)) {
        return res.status(400).json({ success: false, message: 'rating must be in [1..5]' });
      }
      updates.rating = r;
    }

    const doc = await Feedback.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Feedback not found' });

    return res.json({ success: true, data: doc.toPublicJSON() });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/feedbacks/:id
 */
exports.remove = async (req, res, next) => {
  try {
    const doc = await Feedback.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: 'Feedback not found' });
    return res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/feedbacks/summary
 * Trả về số liệu tổng quan cơ bản
 */
exports.summary = async (req, res, next) => {
  try {
    const [total, approved, avg] = await Promise.all([
      Feedback.countDocuments({}),
      Feedback.countDocuments({ isApproved: true }),
      Feedback.aggregate([
        { $match: { isApproved: true } },
        { $group: { _id: null, avgRating: { $avg: '$rating' } } },
      ]),
    ]);

    const result = {
      total,
      approved,
      averageRating: Number((avg[0]?.avgRating || 0).toFixed(2)),
    };

    return res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/feedbacks/public?limit=10&minRating=4&type=feedback
 * Dùng cho trang Testimonials (công khai)
 */
exports.publicList = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '10', 10), 50);
    const minRating = Math.max(parseInt(req.query.minRating || '4', 10), 1);
    const type = req.query.type; // 'feedback' | 'other' (optional)

    const query = {
      isApproved: true,
      rating: { $gte: minRating },
    };
    if (type) query.type = type;

    const docs = await Feedback.find(query)
      .sort({ createdAt: -1, _id: -1 })
      .limit(limit);

    return res.json({
      success: true,
      items: docs.map((d) => d.toPublicJSON()),
    });
  } catch (err) {
    next(err);
  }
};
