const Package = require('../models/Package');
const crud = require('../utils/crud');

const base = crud(Package);
exports.list   = base.list;
exports.get    = base.get;
exports.create = base.create;
exports.update = base.update;
exports.remove = base.remove;
