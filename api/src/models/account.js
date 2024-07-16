import mongoose from 'mongoose';

const theSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const theModel = mongoose.model('Account', theSchema);

export default theModel;