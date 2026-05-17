const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    default: '',
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: [true, 'Gender is required'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: 10,
    max: 100,
  },
  joiningDate: {
    type: Date,
    required: [true, 'Joining date is required'],
    default: Date.now,
  },
  membershipPlan: {
    type: String,
    required: [true, 'Membership plan is required'],
    enum: ['1 Month', '3 Months', '6 Months', '12 Months'],
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  expiryDate: {
    type: Date,
    required: [true, 'Expiry date is required'],
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Pending', 'Overdue'],
    default: 'Paid',
  },
  notes: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

// Virtual to check if membership is expired
memberSchema.virtual('isExpired').get(function () {
  return new Date() > this.expiryDate;
});

// Virtual to check days remaining
memberSchema.virtual('daysRemaining').get(function () {
  const diff = this.expiryDate - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

memberSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Member', memberSchema);
