import mongoose from 'mongoose';

const theSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

const theModel = mongoose.model('Qnote', theSchema);

export default theModel;