import mongoose from 'mongoose';

const theSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    processLink: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
});

const theModel = mongoose.model('User', theSchema);

export default theModel;