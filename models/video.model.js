import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  }
}, {
  timestamps: true
});

const Video = mongoose.model('Video', videoSchema);

export default Video