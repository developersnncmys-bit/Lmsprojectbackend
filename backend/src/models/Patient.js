const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    reg:     { type: String, unique: true, sparse: true },
    name:    { type: String, required: true, trim: true },
    age:     { type: Number, default: 0 },
    sex:     { type: String, enum: ['Male', 'Female', 'Other', 'M', 'F'], default: 'Other' },
    mobile:  { type: String, default: '' },
    email:   { type: String, default: '' },
    city:    { type: String, default: '' },
    address: { type: String, default: '' },
    pin:     { type: String, default: '' },
    bloodGroup:    { type: String, default: '' },
    idProofType:   { type: String, default: '' },
    idProofNumber: { type: String, default: '' },
    uhid:    { type: String, default: '' },
    mrn:     { type: String, default: '' },
    visits:  { type: Number, default: 0 },
    lastVisit: { type: String, default: '' },
    dues:    { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Patient', patientSchema);
