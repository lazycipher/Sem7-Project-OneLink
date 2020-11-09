const { Schema, model } = require('mongoose');

const ActivitySchema = new Schema({
  link: {
    type: String
  },
  author: {
      type: String
  },
  visitor: {
      type: String,
      default: "Anonymous"
  },
  visitor: {
      country: {
          type: String
      },
      city: {
          type: String
      },
      ip: { 
        type: String
      },
      _json: {
          type: Object
      }
  },
  activityDate: {
    type: Date,
    default: new Date()
  }
});

const Activity = model('user', ActivitySchema);

module.exports = Activity
