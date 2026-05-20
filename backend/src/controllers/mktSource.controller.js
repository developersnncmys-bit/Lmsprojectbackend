const MktSource = require('../models/MktSource');
const crud = require('../utils/crud');

const base = crud(MktSource);
exports.list   = base.list;
exports.get    = base.get;
exports.create = base.create;
exports.update = base.update;
exports.remove = base.remove;
