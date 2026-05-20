const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    code:   { type: String, required: true, unique: true, uppercase: true, trim: true },
    name:   { type: String, required: true, trim: true },
    mrp:    { type: Number, default: 0 },
    centre: { type: Number, default: 0 },
    tax:    { type: Number, default: 0 },
    tests:  [{ type: String, uppercase: true, trim: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Package', packageSchema);
