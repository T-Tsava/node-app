const mongoose = require('mongoose');
const TaskModel = require('./TodoTask');

const bcrypt = require('bcrypt');

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
    password: {
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

userSchema.pre(
    'save',
    async function(next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
      next();
    }
  );

userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

module.exports = mongoose.model('User',userSchema);
