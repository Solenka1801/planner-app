const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 5,
    max: 100,
  },
  lastName: {
    type: String,
    required: true,
    min: 5,
    max: 100,
  },
  birthDate: {
    type: String,
    required: true,
    min: 5,
    max: 100,
  },
  city: {
    type: String,
    required: true,
    min: 5,
    max: 100,
  },
  country: {
    type: String,
    required: true,
    min: 5,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
},{ timestamps: {createdAt: 'created_at', updatedAt: 'updated_at', dateTime: 'date_time', description: {
  type: String,
  required: true,
  min: 5,
  max: 255,
 }}}
);


module.exports = mongoose.model("User", userSchema);
