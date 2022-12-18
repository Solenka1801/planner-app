const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
      required: [true, 'An event must have a description']
    },
    dayOfWeek: {
      type: String,
      required: [true, 'An event must have a day of the week']
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
