const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
mongoose.set('useFindAndModify', false);

// Load leave model
const Leave = require('../../models/Leave');

const validateLeaveInput = require('../../validation/leave');

// @route   GET api/leaves/test
// @desc    Tests leaves route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Leaves Works' }));


// @route   POST api/leaves/addleave/:empid             
// @desc    Add new Leave
// @access  Private
router.post(
	'/addleave/:empid', 
	passport.authenticate('jwt', {session: false}), 
	(req,res) => {

	const {errors, isValid} = validateLeaveInput(req.body);

	// Check validation
	if(!isValid){
		return res.status(400).json(errors);
	}
	
	const leaveFields = {};
    leaveFields.user = req.user.id;
    leaveFields.emp = req.params.empid

    if (req.body.empId) leaveFields.empId = req.body.empId;
    if (req.body.empName) leaveFields.empName = req.body.empName;
    if (req.body.leaveType) leaveFields.leaveType = req.body.leaveType;
    if (req.body.from) leaveFields.from = req.body.from;
    if (req.body.to) leaveFields.to = req.body.to;

    new Leave(leaveFields).save().then( leave => res.json(leave));
});


// @route   GET api/leaves/            
// @desc    get all leaves
// @access  Private
router.get(
	'/', 
	passport.authenticate('jwt', {session: false}), 
	(req,res) => {
	
	Leave.find({user: req.user.id})  //based on user id we are pulling out from common table
	.then(leaves => res.json(leaves))
	.catch(err => res.status(404))
});


// @route   POST api/leaves/:leaveid             
// @desc    edit added Employee
// @access  Private
router.post(
	'/:leaveid', 
	passport.authenticate('jwt', {session: false}), 
	(req,res) => {
	
	const {errors, isValid} = validateLeaveInput(req.body);

	// Check validation
	if(!isValid){
		return res.status(400).json(errors);
	}

	const leaveFields = {};
    leaveFields.user = req.user.id;

    if (req.body.empId) leaveFields.empId = req.body.empId;
    if (req.body.empName) leaveFields.empName = req.body.empName;
    if (req.body.leaveType) leaveFields.leaveType = req.body.leaveType;
    if (req.body.from) leaveFields.from = req.body.from;
    if (req.body.to) leaveFields.to = req.body.to;

    Leave.findOneAndUpdate(
          { user: req.user.id, _id: req.params.leaveid },
          { $set: leaveFields },
          { new: true }
        ).then(leave => res.json(leave))
    	.catch(err => res.status(404).json({msg: 'Leave not found'}))

});


// @route   DELETE api/leaves/:leaveid             
// @desc    delete added Leave
// @access  Private
router.delete(
	'/:leaveid', 
	passport.authenticate('jwt', {session: false}), 
	(req,res) => {

    Leave.findOne({ user: req.user.id, _id: req.params.leaveid }) //based on user id and employee email we are pulling out from common table
	.then(leave => {
		leave.remove().then(() => res.json({msg:'Successfully Deleted'}))
	}).catch(err => res.status(404).json({msg: 'Leave Not Found'}))
});


// @route   GET api/leaves/            
// @desc    get all leaves by empid
// @access  Private
router.get(
	'/:empid', 
	passport.authenticate('jwt', {session: false}), 
	(req,res) => {
	
	Leave.find({user: req.user.id, emp: req.params.empid})  //based on user id we are pulling out from common table
	.then(leaves => res.json(leaves))
	.catch(err => res.status(404))
});


router.get(
	'/:leaveid', 
	passport.authenticate('jwt', {session: false}), 
	(req,res) => {

    Employee.findOne({ user: req.user.id, _id: req.params.leaveid }) 
	.then(leave => res.json(leave))
	.catch(err => res.status(404).json({msg: 'Leave Not Found'}))
});



module.exports = router;
