const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  addresses: [{
    addressType: {
      type: String,
      enum: ['billing', 'shipping'],
      default: 'shipping'
    },
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    isDefault: {
      type: Boolean,
      default: false
    }
  }],
  phoneNumber: String,
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date
}, { timestamps: true });

// Indexes for faster lookup
UserSchema.index({ email: 1 });
UserSchema.index({ isActive: 1 });

module.exports = mongoose.model('User', UserSchema); 