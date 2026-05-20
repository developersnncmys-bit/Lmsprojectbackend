const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: {
      type: String,
      enum: ['Super Admin', 'Centre Admin', 'Accounts', 'Result Approver', 'Lab Manager', 'Marketing Staff', 'Receptionist'],
      default: 'Receptionist',
    },
    centre: { type: String, default: 'CTR001' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    last:   { type: String, default: 'just created' },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = function (entered) {
  return bcrypt.compare(entered, this.password);
};

userSchema.virtual('initials').get(function () {
  return (this.name || this.email || 'AN')
    .split(/[\s.@]/).filter(Boolean).slice(0, 2)
    .map((s) => s[0]?.toUpperCase()).join('') || 'AN';
});

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
