const mongoose = require('mongoose');

const todoTaskSchema = new mongoose.Schema({
    taskName: {
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
    deleted: {
        type: Boolean,
        default: false
    },
    deleted_at: {
        type: Date,
        required:false,
        default: null
    },
    completed: {
        type: Boolean,
        default: false
    },
    editing: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('TodoTask',todoTaskSchema);