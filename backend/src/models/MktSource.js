const mongoose = require('mongoose');

const mktSourceSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, unique: true, trim: true },
    staff:    { type: String, default: '' },
    target:   { type: Number, default: 0 },
    achieved: { type: Number, default: 0 },
    patients: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MktSource', mktSourceSchema);
