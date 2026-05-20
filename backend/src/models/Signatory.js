const mongoose = require('mongoose');

const signatorySchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    regNo:   { type: String, required: true, trim: true },
    dept:    { type: String, default: '—' },
    binding: { type: String, default: '—' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Signatory', signatorySchema);
