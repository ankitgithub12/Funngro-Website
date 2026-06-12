import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['teen', 'company']
  },
  // Teen specific fields
  age: {
    type: Number,
    required: function() { return this.role === 'teen'; }
  },
  skills: {
    type: String,
    default: ''
  },
  portfolioLink: {
    type: String,
    default: '',
    trim: true
  },
  pitch: {
    type: String,
    default: ''
  },
  // Company specific fields
  companyName: {
    type: String,
    required: function() { return this.role === 'company'; },
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
