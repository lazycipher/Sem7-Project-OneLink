const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  social: {
    type: Array,
    default: []
  },
  registeredOn: {
    type: Date,
    default: new Date()
  }
});

const User = model('user', UserSchema);

module.exports = User
