import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  gigId: {
    type: String,
    required: true
  },
  gigTitle: {
    type: String,
    required: true
  },
  teenName: {
    type: String,
    required: true,
    trim: true
  },
  teenEmail: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  skills: {
    type: String,
    required: true
  },
  portfolioLink: {
    type: String,
    trim: true
  },
  pitch: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
