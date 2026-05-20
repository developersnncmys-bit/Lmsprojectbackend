const asyncHandler = require('express-async-handler');
const Registration = require('../models/Registration');

function generateRegNo(count) {
  const year = new Date().getFullYear();
  return `CTR001-${year}-${String(count + 1).padStart(6, '0')}`;
}

function compute(body) {
  const items = body.items || [];
  const subtotal = items.reduce((s, it) => s + Math.round(it.centre * (1 - (it.discountPct || 0) / 100)), 0);
  const discount = Math.round(subtotal * Math.max(0, Math.min(100, Number(body.billDiscountPct || 0))) / 100);
  const grandTotal = subtotal - discount;
  const paid = (body.payments || []).reduce((s, p) => s + Number(p.amount || 0), 0);
  const balance = grandTotal - paid;
  return { subtotal, discount, grandTotal, paid, balance };
}

exports.list = asyncHandler(async (_req, res) => {
  const docs = await Registration.find().sort({ createdAt: -1 }).limit(200);
  res.json(docs);
});

exports.get = asyncHandler(async (req, res) => {
  const doc = await Registration.findById(req.params.id);
  if (!doc) { res.status(404); throw new Error('Registration not found'); }
  res.json(doc);
});

exports.create = asyncHandler(async (req, res) => {
  const count = await Registration.countDocuments();
  const regNo = req.body.regNo || generateRegNo(count);
  const totals = compute(req.body);
  const doc = await Registration.create({
    ...req.body,
    regNo,
    ...totals,
    cashier: req.user?.name || req.body.cashier || '',
  });
  res.status(201).json(doc);
});

exports.update = asyncHandler(async (req, res) => {
  const totals = compute(req.body);
  const doc = await Registration.findByIdAndUpdate(req.params.id, { ...req.body, ...totals }, { new: true, runValidators: true });
  if (!doc) { res.status(404); throw new Error('Registration not found'); }
  res.json(doc);
});

exports.remove = asyncHandler(async (req, res) => {
  const doc = await Registration.findByIdAndDelete(req.params.id);
  if (!doc) { res.status(404); throw new Error('Registration not found'); }
  res.json({ ok: true });
});
