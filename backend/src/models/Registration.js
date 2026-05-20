const mongoose = require('mongoose');

const lineItemSchema = new mongoose.Schema(
  {
    type:        { type: String, enum: ['test', 'package'], required: true },
    code:        { type: String, required: true },
    name:        { type: String, required: true },
    mrp:         { type: Number, default: 0 },
    centre:      { type: Number, default: 0 },
    discountPct: { type: Number, default: 0 },
  },
  { _id: false }
);

const paymentSchema = new mongoose.Schema(
  {
    mode:   { type: String, enum: ['cash', 'upi', 'card', 'cheque', 'bank'], required: true },
    amount: { type: Number, required: true },
  },
  { _id: false }
);

const registrationSchema = new mongoose.Schema(
  {
    regNo: { type: String, required: true, unique: true },
    patient: {
      initials: String, first: String, middle: String, last: String,
      dob: String, age: Number, sex: String,
      mobile: String, email: String, address: String, city: String, pin: String,
      bloodGroup: String, idProofType: String, idProofNumber: String,
      uhid: String, mrn: String,
      visitType: { type: String, enum: ['OP', 'IP'], default: 'OP' },
      collectionMode: { type: String, enum: ['Home', 'Centre visit'], default: 'Centre visit' },
      notes: String,
    },
    refDoctor: { type: String, default: '' },
    refCentre: { type: String, default: '' },
    mktSource: { type: String, default: '' },
    items:     [lineItemSchema],
    billDiscountPct:    { type: Number, default: 0 },
    billDiscountReason: { type: String, default: '' },
    payments:           [paymentSchema],
    subtotal:           { type: Number, default: 0 },
    discount:           { type: Number, default: 0 },
    grandTotal:         { type: Number, default: 0 },
    paid:               { type: Number, default: 0 },
    balance:            { type: Number, default: 0 },
    counter:            { type: String, default: 'Counter 1' },
    cashier:            { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Registration', registrationSchema);
