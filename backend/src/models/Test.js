const mongoose = require('mongoose');

const testSchema = new mongoose.Schema(
  {
    code:      { type: String, required: true, unique: true, uppercase: true, trim: true },
    name:      { type: String, required: true, trim: true },
    dept:      { type: String, required: true },
    sample:    { type: String, default: 'Serum' },
    container: { type: String, default: 'Red top (SST)' },
    method:    { type: String, default: '—' },
    tat:       { type: String, default: '4h' },
    mrp:       { type: Number, default: 0 },
    centre:    { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Test', testSchema);
