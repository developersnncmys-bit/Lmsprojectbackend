const Signatory = require('../models/Signatory');
const crud = require('../utils/crud');

const base = crud(Signatory);
exports.list   = base.list;
exports.get    = base.get;
exports.create = base.create;
exports.update = base.update;
exports.remove = base.remove;
