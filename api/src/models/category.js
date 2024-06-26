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
  },
  accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }]
});

const theModel = mongoose.model('Category', theSchema);

export default theModel;