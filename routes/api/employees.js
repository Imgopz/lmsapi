const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
mongoose.set('useFindAndModify', false);


// Load profile model
const Employee = require('../../models/Employee');

// Load user model
const User = require('../../models/User');

const validateEmployeeInput = require('../../validation/employee');


// @route   GET api/employees/test
// @desc    Tests employees route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Employees Works' }));


// @route   POST api/employees/addemployee             
// @desc    Add new Employee
// @access  Private
router.post(
	'/addemployee', 
	passport.authenticate('jwt', {session: false}), 
	(req,res) => {
	
	const {errors, isValid} = validateEmployeeInput(req.body);

	// Check validation
	if(!isValid){
		return res.status(400).json(errors);
	}

	const employeeFields = {};
    employeeFields.user = req.user.id;
    if (req.body.empId) employeeFields.empId = req.body.empId;
    if (req.body.empName) employeeFields.empName = req.body.empName;
    if (req.body.empEmail) employeeFields.empEmail = req.body.empEmail;

	Employee.findOne({ empEmail: req.body.empEmail, user: req.user.id }) //based on user id and employee email we are pulling out from common table
	.then(employee => {
		if(employee){
			errors.empId = 'Employee already exists'
			return res.status(400).json(errors);
		} else {
			new Employee(employeeFields).save().then( employee => res.json(employee));
		}
	});
});


// @route   GET api/employees/            
// @desc    get all employees
// @access  Private
router.get(
	'/', 
	passport.authenticate('jwt', {session: false}), 
	(req,res) => {
	
	Employee.find({user: req.user.id})  //based on user id we are pulling out from common table
	.then(employees => res.json(employees))
	.catch(err => res.status(404))
});


// @route   POST api/employees/:empid             
// @desc    edit added Employee
// @access  Private
router.post(
	'/:empid', 
	passport.authenticate('jwt', {session: false}), 
	(req,res) => {
	
	const {errors, isValid} = validateEmployeeInput(req.body);

	// Check validation
	if(!isValid){
		return res.status(400).json(errors);
	}

	const employeeFields = {};
    employeeFields.user = req.user.id;
    if (req.body.empId) employeeFields.empId = req.body.empId;
    if (req.body.empName) employeeFields.empName = req.body.empName;
    if (req.body.empEmail) employeeFields.empEmail = req.body.empEmail;

    Employee.findOneAndUpdate(
          { user: req.user.id, _id: req.params.empid },
          { $set: employeeFields },
          { new: true }
        ).then(employee => res.json(employee))
    	.catch(err => res.status(404).json({msg: 'Employee not found'}))

});


// @route   DELETE api/employees/:empid             
// @desc    delete added Employee
// @access  Private
router.delete(
	'/:empid', 
	passport.authenticate('jwt', {session: false}), 
	(req,res) => {

    Employee.findOne({ user: req.user.id, _id: req.params.empid }) //based on user id and employee email we are pulling out from common table
	.then(employee => {
		employee.remove().then(() => res.json({msg:'Successfully Deleted'}))
	}).catch(err => res.status(404).json({msg: 'Employee Not Found'}))
});


// @route   GET api/employees/:empid             
// @desc    get added Employee by id
// @access  Private

router.get(
	'/:empid', 
	passport.authenticate('jwt', {session: false}), 
	(req,res) => {

    Employee.findOne({ user: req.user.id, _id: req.params.empid }) 
	.then(employee => res.json(employee))
	.catch(err => res.status(404).json({msg: 'Employee Not Found'}))
});



module.exports = router;

