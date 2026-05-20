const RefDoctor = require('../models/RefDoctor');
const crud = require('../utils/crud');

const base = crud(RefDoctor);
exports.list   = base.list;
exports.get    = base.get;
exports.create = base.create;
exports.update = base.update;
exports.remove = base.remove;
