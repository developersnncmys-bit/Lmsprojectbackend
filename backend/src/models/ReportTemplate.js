const mongoose = require('mongoose');

const reportTemplateSchema = new mongoose.Schema(
  {
    code:    { type: String, required: true, unique: true, trim: true },
    name:    { type: String, required: true, trim: true },
    dept:    { type: String, required: true },
    params:  { type: Number, default: 0 },
    signoff: { type: String, default: 'Pathologist' },
    desc:    { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ReportTemplate', reportTemplateSchema);
