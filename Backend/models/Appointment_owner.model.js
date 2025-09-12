const mongoose = require('mongoose');

const SPECIES = ['Dog','Cat','Bird','Rabbit','Hamster','Fish','Other'];
const GENDER  = ['Male','Female'];
const STATUS  = 'pending';

const appointmentOwnerSchema = new mongoose.Schema({
  // Chủ nuôi
  ownerName:       { type: String, required: true, trim: true, maxlength: 120 },
  contactNumber:   { type: String, required: true, trim: true, match: [/^\+?\d{9,12}$/] },
  email:           { type: String, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/], required: true },

  // Thú cưng
  petName:         { type: String, required: true, trim: true, maxlength: 120 },
  petAge:          { type: Number, min: 0, max: 100 },
  petSpecies:      { type: String, enum: SPECIES, default: 'Dog' },
  petGender:       { type: String, enum: GENDER,  default: 'Male' },

  // Lịch hẹn
  appointmentDate: { type: Date, required: true, index: true },

  // Thông tin thêm
  reason:          { type: String, trim: true, maxlength: 300 },
  note:            { type: String, trim: true, maxlength: 2000 },

  // Trạng thái & bác sĩ (chỉ lưu TEXT, không FK)
  status:          { type: String, enum: STATUS, default: 'pending', index: true },
  assignedVet:     { type: String, trim: true, default: '' }, // tên bác sĩ (nếu bạn muốn random)
}, { timestamps: true });

appointmentOwnerSchema.methods.toPublicJSON = function() {
  return {
    id: this._id.toString(),
    ownerName: this.ownerName,
    contactNumber: this.contactNumber,
    email: this.email,
    petName: this.petName,
    petAge: this.petAge,
    petSpecies: this.petSpecies,
    petGender: this.petGender,
    appointmentDate: this.appointmentDate,
    reason: this.reason,
    note: this.note,
    status: this.status,
    assignedVet: this.assignedVet,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

module.exports = mongoose.model('AppointmentOwner', appointmentOwnerSchema);
