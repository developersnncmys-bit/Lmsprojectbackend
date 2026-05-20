const mongoose = require('mongoose');

const refCentreSchema = new mongoose.Schema(
  {
    code:     { type: String, required: true, unique: true, uppercase: true, trim: true },
    name:     { type: String, required: true, trim: true },
    city:     { type: String, default: '—' },
    contact:  { type: String, default: '' },
    payout:   { type: String, default: '—' },
    monthBiz: { type: Number, default: 0 },
    dues:     { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('RefCentre', refCentreSchema);
