const Validator = require("validator")
const isEmpty = require('./is-empty')

module.exports = function validateEmployeeInput(data){
	let errors = {};

	data.empId = !isEmpty(data.empId) ? data.empId : '';
	data.empName = !isEmpty(data.empName) ? data.empName : '';
	data.empEmail = !isEmpty(data.empEmail) ? data.empEmail : '';
	

	if(Validator.isEmpty(data.empId)){
		errors.empId = 'Employee Id field is required' 
	}
	

	if(!Validator.isEmail(data.empEmail)){
		errors.empEmail = 'Email is invalid' 
	}

	if(Validator.isEmpty(data.empEmail)){
		errors.empEmail = 'Email field is required' 
	}

	if(!Validator.isLength(data.empName, { min: 2, max: 30})) {
		errors.empName = 'Name must be between 2 to 30 characters';
	}

	if(Validator.isEmpty(data.empName)){
		errors.empName = 'Name field is required' //Step 2 this data.name will be passed from step 1
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}