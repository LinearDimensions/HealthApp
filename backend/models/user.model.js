const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({ //carpark, report, user, timestamp, status
  name: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true },
  condition: { type: String, required: true },
  doctor: { type: String, required: true },
}, {
  timestamps: true,
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;