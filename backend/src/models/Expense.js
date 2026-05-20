const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    voucher:  { type: String, unique: true, sparse: true },
    vendor:   { type: String, required: true, trim: true },
    category: { type: String, enum: ['Reagents', 'Logistics', 'Rent', 'Utilities', 'Salary', 'Maintenance', 'Other'], default: 'Other' },
    amount:   { type: Number, required: true },
    mode:     { type: String, enum: ['Cash', 'UPI', 'Card', 'Cheque', 'Bank'], default: 'Cash' },
    notes:    { type: String, default: '' },
    date:     { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);
