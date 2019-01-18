const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LeaveSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  emp: {
    type: Schema.Types.ObjectId,
    ref: 'employee'
  },
  empId: {
    type: String,
    required: true
  },
  empName: {
    type: String,
    required: true
  },
  leaveType: {
    type: String,
    required: true
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date,
    required: true
  }
});

module.exports = Leave = mongoose.model('leave', LeaveSchema);
