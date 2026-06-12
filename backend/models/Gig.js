import mongoose from 'mongoose';

const GigSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Design', 'Writing', 'Tech', 'Video', 'Marketing', 'Other']
  },
  skills: {
    type: [String],
    default: []
  },
  duration: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Fallback checking flag
export default mongoose.models.Gig || mongoose.model('Gig', GigSchema);
