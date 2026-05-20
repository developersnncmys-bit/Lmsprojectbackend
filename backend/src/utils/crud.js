// Generic CRUD factory for simple Mongoose models. Wraps each handler with
// express-async-handler so thrown errors propagate to the error middleware.
const asyncHandler = require('express-async-handler');

function crud(Model) {
  return {
    list: asyncHandler(async (req, res) => {
      const docs = await Model.find().sort({ createdAt: -1 });
      res.json(docs);
    }),
    get: asyncHandler(async (req, res) => {
      const doc = await Model.findById(req.params.id);
      if (!doc) { res.status(404); throw new Error('Not found'); }
      res.json(doc);
    }),
    create: asyncHandler(async (req, res) => {
      const doc = await Model.create(req.body);
      res.status(201).json(doc);
    }),
    update: asyncHandler(async (req, res) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!doc) { res.status(404); throw new Error('Not found'); }
      res.json(doc);
    }),
    remove: asyncHandler(async (req, res) => {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) { res.status(404); throw new Error('Not found'); }
      res.json({ ok: true });
    }),
  };
}

module.exports = crud;
