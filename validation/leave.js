const Validator = require("validator")
const isEmpty = require('./is-empty')

module.exports = function validateLeaveInput(data){
	let errors = {};

	data.empId = !isEmpty(data.empId) ? data.empId : '';
	data.empName = !isEmpty(data.empName) ? data.empName : '';
	data.leaveType = !isEmpty(data.leaveType) ? data.leaveType : '';
	data.from = !isEmpty(data.from) ? data.from : '';
	data.to = !isEmpty(data.to) ? data.to : '';
	

	if(!Validator.isLength(data.empId, { min: 4, max: 8})){
		errors.empId = 'Employee Id must be between 4 to 8 digits' 
	}

	if(Validator.isEmpty(data.empId)){
		errors.empId = 'Employee Id field is required' 
	}

	if(!Validator.isLength(data.empName, { min: 2, max: 30})) {
		errors.empName = 'Name must be between 2 to 30 characters';
	}

	if(Validator.isEmpty(data.empName)){
		errors.empName = 'Name field is required' 
	}

	if(Validator.isEmpty(data.leaveType)){
		errors.leaveType = 'Leave type is required' 
	}

	if(Validator.isEmpty(data.from)){
		errors.from = 'From date is required' 
	}

	if(Validator.isEmpty(data.to)){
		errors.to = 'To date is requried' 
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}