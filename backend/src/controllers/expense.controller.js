const asyncHandler = require('express-async-handler');
const Expense = require('../models/Expense');

exports.list = asyncHandler(async (_req, res) => {
  const items = await Expense.find().sort({ createdAt: -1 });
  res.json(items);
});

exports.create = asyncHandler(async (req, res) => {
  const { vendor, amount } = req.body;
  if (!vendor || !amount) { res.status(400); throw new Error('vendor and amount required'); }
  const count = await Expense.countDocuments();
  const year = new Date().getFullYear();
  const voucher = req.body.voucher || `EXP-${year}-${String(count + 1).padStart(4, '0')}`;
  const doc = await Expense.create({ ...req.body, voucher });
  res.status(201).json(doc);
});

exports.update = asyncHandler(async (req, res) => {
  const doc = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!doc) { res.status(404); throw new Error('Voucher not found'); }
  res.json(doc);
});

exports.remove = asyncHandler(async (req, res) => {
  const doc = await Expense.findByIdAndDelete(req.params.id);
  if (!doc) { res.status(404); throw new Error('Voucher not found'); }
  res.json({ ok: true });
});

// GET /api/expenses/today-summary
exports.todaySummary = asyncHandler(async (_req, res) => {
  const start = new Date(); start.setHours(0, 0, 0, 0);
  const end   = new Date(); end.setHours(23, 59, 59, 999);
  const list = await Expense.find({ date: { $gte: start, $lte: end } });
  const total = list.reduce((s, e) => s + (e.amount || 0), 0);
  res.json({ count: list.length, total, list });
});
