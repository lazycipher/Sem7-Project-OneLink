const { Schema, model } = require('mongoose');

const ActivitySchema = new Schema({
  username: {
    type: String
  },
  name: {
      type: String
  },
  href: {
      type: String,
  },
  IP: {
    type: Object
  },
  activityDate: {
    type: Date,
    default: new Date()
  }
});

const Activity = model('activity', ActivitySchema);

module.exports = Activity
