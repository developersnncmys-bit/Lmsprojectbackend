const mongoose = require('mongoose');

const refDoctorSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true, trim: true },
    speciality: { type: String, default: '—' },
    regNo:      { type: String, required: true, trim: true },
    payout:     { type: String, default: '—' },
    source:     { type: String, default: '' },
    mobile:     { type: String, default: '' },
    pan:        { type: String, default: '' },
    monthBiz:   { type: Number, default: 0 },
    dues:       { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('RefDoctor', refDoctorSchema);
