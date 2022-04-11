const mongoose = require('mongoose');
const TaskModel = require('./TodoTask');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default:Date.now
    },
    updated_at: {
        type: Date,
        required:false,
        default:null
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TodoTask'
    }]
});
module.exports = mongoose.model('User',userSchema);
