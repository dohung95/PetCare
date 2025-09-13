const Feedback = require('../models/Feedback');

function pick(obj, keys) {
  const out = {};
  for (const k of keys) if (obj[k] !== undefined) out[k] = obj[k];
  return out;
}

exports.create = async (req, res, next) => {
  try {
    const data = pick(req.body, [
      'name',
      'email',
      'phone',
      'type',
      'rating',
      'message'
    ]);

    if (req.user && req.user.id) data.user = req.user.id;

    
    if (!(data.rating >= 1 && data.rating <= 5)) {
      return res.status(400).json({ success: false, message: 'rating must be in [1..5]' });
    }

    data.targetId = String(data.targetId);

    const doc = await Feedback.create(data);
    return res.status(201).json({ success: true, data: doc.toPublicJSON() });
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const {
      rating,
      minRating,
      maxRating,
      isApproved,
      q,
      page = 1,
      limit = 20,
      sort = '-_id',
    } = req.query;

    const filter = {};
    if (isApproved === 'true') filter.isApproved = true;
    if (isApproved === 'false') filter.isApproved = false;
    if (rating) filter.rating = Number(rating);
    if (minRating || maxRating) {
      filter.rating = {};
      if (minRating) filter.rating.$gte = Number(minRating);
      if (maxRating) filter.rating.$lte = Number(maxRating);
    }
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { comment: { $regex: q, $options: 'i' } },
        { name: { $regex: q, $options: 'i' } },
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

exports.update = async (req, res, next) => {
  try {
    const allowed = ['rating', 'title', 'comment', 'isApproved', 'name', 'email', 'phone', 'meta'];
    const updates = pick(req.body, allowed);

    if (updates.rating != null) {
      const r = Number(updates.rating);
      if (!(r >= 1 && r <= 5)) return res.status(400).json({ success: false, message: 'rating must be in [1..5]' });
      updates.rating = r;
    }

    const doc = await Feedback.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Feedback not found' });
    return res.json({ success: true, data: doc.toPublicJSON() });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const doc = await Feedback.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: 'Feedback not found' });
    return res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};

exports.summary = async (req, res, next) => {
  try {
    return res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};