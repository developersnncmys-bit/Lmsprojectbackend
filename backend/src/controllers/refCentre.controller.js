const RefCentre = require('../models/RefCentre');
const crud = require('../utils/crud');

const base = crud(RefCentre);
exports.list   = base.list;
exports.get    = base.get;
exports.create = base.create;
exports.update = base.update;
exports.remove = base.remove;
