const ReportTemplate = require('../models/ReportTemplate');
const crud = require('../utils/crud');

const base = crud(ReportTemplate);
exports.list   = base.list;
exports.get    = base.get;
exports.create = base.create;
exports.update = base.update;
exports.remove = base.remove;
