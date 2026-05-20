const asyncHandler = require('express-async-handler');
const Test = require('../models/Test');
const crud = require('../utils/crud');

const base = crud(Test);

exports.list   = base.list;
exports.get    = base.get;
exports.create = base.create;
exports.update = base.update;
exports.remove = base.remove;

// POST /api/tests/bulk-edit  { codes: [], dept?, mrpPct?, centrePct? }
exports.bulkEdit = asyncHandler(async (req, res) => {
  const { codes = [], dept, mrpPct, centrePct } = req.body;
  if (!Array.isArray(codes) || codes.length === 0) {
    res.status(400); throw new Error('codes[] is required.');
  }
  const tests = await Test.find({ code: { $in: codes } });
  for (const t of tests) {
    if (dept) t.dept = dept;
    if (mrpPct !== undefined && mrpPct !== null && mrpPct !== '') {
      t.mrp = Math.max(0, Math.round(t.mrp * (1 + Number(mrpPct) / 100)));
    }
    if (centrePct !== undefined && centrePct !== null && centrePct !== '') {
      t.centre = Math.max(0, Math.round(t.centre * (1 + Number(centrePct) / 100)));
    }
    await t.save();
  }
  res.json({ updated: tests.length });
});

// POST /api/tests/bulk-upload  { rows: [...] }
exports.bulkUpload = asyncHandler(async (req, res) => {
  const { rows = [] } = req.body;
  if (!Array.isArray(rows) || rows.length === 0) {
    res.status(400); throw new Error('rows[] is required.');
  }
  const ops = rows.map((r) => ({
    updateOne: {
      filter: { code: String(r.code || '').toUpperCase() },
      update: {
        $set: {
          code: String(r.code || '').toUpperCase(),
          name: r.name, dept: r.dept,
          sample: r.sample, container: r.container, method: r.method,
          tat: r.tat, mrp: Number(r.mrp || 0), centre: Number(r.centre || 0),
        },
      },
      upsert: true,
    },
  }));
  const result = await Test.bulkWrite(ops);
  res.json({ matched: result.matchedCount, upserts: Object.keys(result.upsertedIds || {}).length });
});
