const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { notFound, errorHandler } = require('./middleware/error');

const authRoutes          = require('./routes/auth.routes');
const userRoutes          = require('./routes/user.routes');
const testRoutes          = require('./routes/test.routes');
const packageRoutes       = require('./routes/package.routes');
const reportTemplateRoutes = require('./routes/reportTemplate.routes');
const patientRoutes       = require('./routes/patient.routes');
const orderRoutes         = require('./routes/order.routes');
const refDoctorRoutes     = require('./routes/refDoctor.routes');
const refCentreRoutes     = require('./routes/refCentre.routes');
const mktSourceRoutes     = require('./routes/mktSource.routes');
const signatoryRoutes     = require('./routes/signatory.routes');
const expenseRoutes       = require('./routes/expense.routes');
const registrationRoutes  = require('./routes/registration.routes');

const app = express();

// app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));

app.use('/api/auth',             authRoutes);
app.use('/api/users',            userRoutes);
app.use('/api/tests',            testRoutes);
app.use('/api/packages',         packageRoutes);
app.use('/api/report-templates', reportTemplateRoutes);
app.use('/api/patients',         patientRoutes);
app.use('/api/orders',           orderRoutes);
app.use('/api/ref-doctors',      refDoctorRoutes);
app.use('/api/ref-centres',      refCentreRoutes);
app.use('/api/mkt-sources',      mktSourceRoutes);
app.use('/api/signatories',      signatoryRoutes);
app.use('/api/expenses',         expenseRoutes);
app.use('/api/registrations',    registrationRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
