function pick(obj, keys) {
  const out = {};
  for (const k of keys) if (obj[k] !== undefined) out[k] = obj[k];
  return out;
}

exports.validateOwnerUpdate = (req, res, next) => {
  const body = pick(req.body, ['name', 'phone', 'address', 'email']);
  const errors = [];

  if (body.name != null && String(body.name).trim().length < 2) {
    errors.push('name must be at least 2 chars');
  }
  if (body.phone != null && !/^\d{9,12}$/.test(String(body.phone))) {
    errors.push('phone must be 9-12 digits');
  }
  if (body.email != null && !/^\S+@\S+\.\S+$/.test(String(body.email))) {
    errors.push('email is invalid');
  }
  if (body.address != null && !String(body.address).trim()) {
    errors.push('address is required');
  }

  // chặn các field không cho phép
  const notAllowed = ['role','password','resetPasswordToken','resetPasswordExpires'];
  for (const k of Object.keys(req.body)) {
    if (notAllowed.includes(k)) errors.push(`field ${k} is not allowed`);
  }

  if (errors.length) return res.status(400).json({ success:false, message:'Validation error', errors });
  req._sanitizedBody = body;
  next();
};
