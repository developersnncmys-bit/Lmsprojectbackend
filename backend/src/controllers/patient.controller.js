const Patient = require('../models/Patient');
const crud = require('../utils/crud');

const base = crud(Patient);
exports.list   = base.list;
exports.get    = base.get;
exports.create = base.create;
exports.update = base.update;
exports.remove = base.remove;
