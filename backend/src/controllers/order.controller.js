const Order = require('../models/Order');
const crud = require('../utils/crud');

const base = crud(Order);
exports.list   = base.list;
exports.get    = base.get;
exports.create = base.create;
exports.update = base.update;
exports.remove = base.remove;
