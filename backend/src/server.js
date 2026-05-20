require('dotenv').config();

if (!process.env.JWT_SECRET) {
  console.error('\n  ✗ JWT_SECRET is not set in backend/.env');
  console.error('     Add a line like:  JWT_SECRET=some-long-random-string');
  console.error('     Generate one with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"\n');
  process.exit(1);
}

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`LabSync API listening on http://localhost:${PORT}`);
  });
})();
