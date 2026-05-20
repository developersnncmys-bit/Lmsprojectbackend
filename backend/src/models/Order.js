const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    reg:       { type: String, required: true },
    patient:   { type: String, required: true },
    dept:      { type: String, required: true },
    test:      { type: String, required: true },
    sampleId:  { type: String, default: '' },
    collected: { type: String, default: '' },
    station:   { type: String, default: '' },
    tat:       { type: String, default: '4h' },
    status:    { type: String, enum: ['collected', 'processing', 'reported', 'dispatched', 'cancelled'], default: 'collected' },
    priority:  { type: String, enum: ['normal', 'high', 'stat'], default: 'normal' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
