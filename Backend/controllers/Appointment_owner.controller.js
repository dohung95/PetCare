const AppointmentOwner = require('../models/Appointment_owner.model');

// OPTIONAL: random bác sĩ theo tên (nếu bảng tồn tại)
let Vet = null;
try { Vet = require('../models/veterinarian.model'); } catch { /* optional */ }

function pick(obj, keys){ const o={}; for (const k of keys) if (obj[k]!==undefined) o[k]=obj[k]; return o; }

exports.create = async (req, res, next) => {
  try {
    const data = pick(req.body, [
      'ownerName','contactNumber','email',
      'petName','petAge','petSpecies','petGender',
      'appointmentDate','reason','note','status'
    ]);

    // chuẩn hóa date
    const t = new Date(data.appointmentDate);
    if (isNaN(t.getTime())) return res.status(400).json({ success:false, message:'appointmentDate invalid' });
    data.appointmentDate = t;

    // random vet name (chỉ là TEXT, không FK)
    if (!req.body.assignedVet && Vet) {
      const sample = await Vet.aggregate([{ $match: { isActive: true } }, { $sample: { size: 1 } }]);
      if (sample[0]?.name) data.assignedVet = sample[0].name;
    } else if (req.body.assignedVet) {
      data.assignedVet = String(req.body.assignedVet);
    }

    const doc = await AppointmentOwner.create(data);
    return res.status(201).json({ success:true, data: doc.toPublicJSON() });
  } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
  try {
    const { q, status, dateFrom, dateTo, page=1, limit=20, sort='-createdAt' } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (dateFrom || dateTo) {
      filter.appointmentDate = {};
      if (dateFrom) filter.appointmentDate.$gte = new Date(dateFrom);
      if (dateTo)   filter.appointmentDate.$lte = new Date(dateTo);
    }
    if (q) {
      filter.$or = [
        { ownerName:   { $regex: q, $options: 'i' } },
        { contactNumber:{ $regex: q, $options: 'i' } },
        { petName:     { $regex: q, $options: 'i' } },
        { assignedVet: { $regex: q, $options: 'i' } },
        { reason:      { $regex: q, $options: 'i' } },
        { note:        { $regex: q, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(1, Number(page));
    const perPage = Math.min(100, Math.max(1, Number(limit)));
    const [items, total] = await Promise.all([
      AppointmentOwner.find(filter).sort(sort).skip((pageNum-1)*perPage).limit(perPage),
      AppointmentOwner.countDocuments(filter)
    ]);

    res.json({ success:true, data: items.map(d=>d.toPublicJSON()),
      pagination:{ total, page: pageNum, limit: perPage, pages: Math.ceil(total/perPage) } });
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const doc = await AppointmentOwner.findById(req.params.id);
    if (!doc) return res.status(404).json({ success:false, message:'Not found' });
    res.json({ success:true, data: doc.toPublicJSON() });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const allowed = [
      'ownerName','contactNumber','email',
      'petName','petAge','petSpecies','petGender',
      'appointmentDate','reason','note','status','assignedVet'
    ];
    const patch = pick(req.body, allowed);
    if (patch.appointmentDate) {
      const t = new Date(patch.appointmentDate);
      if (isNaN(t.getTime())) return res.status(400).json({ success:false, message:'appointmentDate invalid' });
      patch.appointmentDate = t;
    }
    const doc = await AppointmentOwner.findByIdAndUpdate(req.params.id, patch, { new: true });
    if (!doc) return res.status(404).json({ success:false, message:'Not found' });
    res.json({ success:true, data: doc.toPublicJSON() });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const doc = await AppointmentOwner.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success:false, message:'Not found' });
    res.json({ success:true, message:'Deleted' });
  } catch (err) { next(err); }
};
