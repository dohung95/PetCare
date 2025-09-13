// middlewares/appointments_owner.middlewares.js

const SPECIES = ['Dog','Cat','Bird','Rabbit','Hamster','Fish','Other'];
const GENDER  = ['Male','Female'];       // chỉ 2 giá trị
const STATUS  = ['pending'];             // chỉ pending

function isValidDate(d) {
  return !isNaN(new Date(d).getTime());
}

function validateCreate(req, res, next) {
  const {
    ownerName, contactNumber, email,
    petName, petAge, petSpecies, petGender,
    appointmentDate, status
  } = req.body || {};

  const errors = [];

  // Bắt buộc
  if (!ownerName)       errors.push('ownerName is required');
  if (!contactNumber)   errors.push('contactNumber is required');
  if (!petName)         errors.push('petName is required');
  if (!appointmentDate) errors.push('appointmentDate is required');
  if (!email)           errors.push('email is required');

  // Format
  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('email is invalid');
  }
  if (contactNumber && !/^\+?\d{8,15}$/.test(contactNumber)) {
    errors.push('contactNumber is invalid (expect + and 8-15 digits)');
  }

  // Date
  if (appointmentDate && !isValidDate(appointmentDate)) {
    errors.push('appointmentDate invalid');
  }

  // petAge
  if (petAge != null) {
    const n = Number(petAge);
    if (isNaN(n) || n < 0 || n > 100) errors.push('petAge must be 0..100');
  }

  // Enum
  if (petSpecies && !SPECIES.includes(petSpecies)) {
    errors.push(`petSpecies must be one of ${SPECIES.join(', ')}`);
  }
  if (petGender && !GENDER.includes(petGender)) {
    errors.push(`petGender must be one of ${GENDER.join(', ')}`);
  }
  if (status && !STATUS.includes(status)) {
    errors.push(`status must be "${STATUS[0]}"`);
  }

  if (errors.length) return res.status(400).json({ success:false, errors });
  next();
}

function validateUpdate(req, res, next) {
  const b = req.body || {};
  const e = [];

  if (b.email && !/^\S+@\S+\.\S+$/.test(b.email)) {
    e.push('email is invalid');
  }
  if (b.contactNumber && !/^\+?\d{8,15}$/.test(b.contactNumber)) {
    e.push('contactNumber is invalid (expect + and 8-15 digits)');
  }

  if (b.appointmentDate && !isValidDate(b.appointmentDate)) {
    e.push('appointmentDate invalid');
  }

  if (b.petAge != null) {
    const n = Number(b.petAge);
    if (isNaN(n) || n < 0 || n > 100) e.push('petAge must be 0..100');
  }

  if (b.petSpecies && !SPECIES.includes(b.petSpecies)) {
    e.push(`petSpecies must be one of ${SPECIES.join(', ')}`);
  }
  if (b.petGender && !GENDER.includes(b.petGender)) {
    e.push(`petGender must be one of ${GENDER.join(', ')}`);
  }
  if (b.status && !STATUS.includes(b.status)) {
    e.push(`status must be "${STATUS[0]}"`);
  }

  if (e.length) return res.status(400).json({ success:false, errors:e });
  next();
}

module.exports = { validateCreate, validateUpdate };
