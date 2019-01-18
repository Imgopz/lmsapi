const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const EmployeeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  empId: {
    type: String,
    required: true
  },
  empName: {
    type: String,
    required: true
  },
  empEmail: {
    type: String,
    required: true
  }
});

module.exports = Employee = mongoose.model('employee', EmployeeSchema);


/*
,
  leaves: [
    {
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
        type: Date
      }
    }
  ]*/