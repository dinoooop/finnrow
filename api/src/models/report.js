import mongoose from 'mongoose';

const theSchema = new mongoose.Schema({
  period: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  reportable: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'reportableType'
  },
  reportableType: {
    type: String,
    required: true,
    enum: ['Account', 'Category']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  },
});

const theModel = mongoose.model('Report', theSchema);

export default theModel;