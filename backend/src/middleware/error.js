function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Route not found: ${req.method} ${req.originalUrl}`));
}

function errorHandler(err, req, res, _next) {
  let status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || 'Server error';

  // Mongoose validation errors → 400 with the first specific message
  if (err.name === 'ValidationError') {
    status = 400;
    const fields = Object.values(err.errors || {}).map((e) => e.message);
    if (fields.length) message = fields.join('; ');
  }
  // Duplicate-key (unique index) errors
  if (err.code === 11000) {
    status = 409;
    const key = Object.keys(err.keyValue || {})[0] || 'field';
    message = `Duplicate ${key}: ${err.keyValue?.[key]}`;
  }
  // Bad ObjectId in a route param
  if (err.name === 'CastError') {
    status = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  console.error(`[${req.method} ${req.originalUrl}] ${status} · ${message}`);
  res.status(status).json({
    message,
    ...(process.env.NODE_ENV === 'production' ? {} : { stack: err.stack }),
  });
}

module.exports = { notFound, errorHandler };
