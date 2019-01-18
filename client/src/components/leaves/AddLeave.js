import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import  TextFieldGroup  from '../common/TextFieldGroup';
import  SelectListGroup  from '../common/SelectListGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLeave } from '../../actions/leaveActions';
import { getEmployeeById } from '../../actions/employeeActions';
import isEmpty from '../../validation/is-empty';

class AddLeave extends Component {

  constructor(props){
  	super(props);
  	this.state = {
  		empid: props.match.params,
  		empId: '',
  		empName: '',
  		leaveType: '',
  		from: '',
  		to:'',
  		errors: {}
  	}
  	this.onChange = this.onChange.bind(this);
  	this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
  	this.props.getEmployeeById(this.state.empid.id);
  }

  componentWillReceiveProps(nextProps){
  	if(nextProps.errors){
  		this.setState({errors: nextProps.errors})
  	}

  	if(nextProps.employees.employees[0]){
  		const employee = nextProps.employees.employees[0]		

  		employee.leaveType = !isEmpty(employee.leaveType) ? employee.leaveType : '';
      	employee.from = !isEmpty(employee.from) ? employee.from : '';
      	employee.to = !isEmpty(employee.to) ? employee.to : '';
  		// Set State
  		this.setState({
	  		empId: employee.empId,
	  		empName: employee.empName,
	  		leaveType: employee.leaveType,
	  		from: employee.from,
	  		to: employee.to
	  	});
  	}
  }

  onSubmit(e){
  	e.preventDefault();

  	const newLeave = {
  		empId: this.state.empId,
  		empName: this.state.empName,
  		leaveType: this.state.leaveType,
  		from: this.state.from,
  		to: this.state.to,
  	}

  	this.props.addLeave( newLeave, this.state.empid.id, this.props.history );
  }

  onChange(e){
  	this.setState({[e.target.name]: e.target.value});
  }

  render() {

  	const { errors } = this.state;

  	// Select options for leave Type
  	const options = [
  		{ label:'* Select leave type', value: 0 },
  		{ label:'Earned Leave', value: 'Earned Leave' },
  		{ label:'Work From Home', value: 'Work From Home' },
  		{ label:'Comp Off', value: 'Comp Off' },
  		{ label:'Medical Leave', value: 'Medical Leave' },
  		{ label:'On Duty', value: 'On Duty' }
  	]
  	
    return (
     <div className="add-employee">
	    <div className="container">
	      <div className="row">
	        <div className="col-md-8 m-auto">
	          <Link to="/leaves" className="btn btn-light">
	            Go Back
	          </Link>
	          <h1 className="display-4 text-center">Add Leaves</h1>
	          <p className="lead text-center">Add leave details for your employees' here</p>
	          <small className="d-block pb-3">* = required field</small>
	          <form onSubmit={this.onSubmit}>
	          	<TextFieldGroup
	                placeholder="* Employee Id"
	                name="empId"
	                value = {this.state.empId}
	                onChange = {this.onChange} 
	                error = {errors.empId}
	            />
	            <TextFieldGroup
	                placeholder="* Employee Name"
	                name="empName"
	                value = {this.state.empName}
	                onChange = {this.onChange} 
	                error = {errors.empName}
	            />
	            <SelectListGroup
	                placeholder="* Select a leavetype"
	                name="leaveType"
	                value = {this.state.leaveType}
	                options = {options}
	                onChange = {this.onChange} 
	                error = {errors.leaveType}
	            />
	            <TextFieldGroup
	                name="from"
	                value = {this.state.from}
	                onChange = {this.onChange} 
	                error = {errors.from}
	                type = "date"
	            />
	            <TextFieldGroup
	                name="to"
	                value = {this.state.to}
	                onChange = {this.onChange} 
	                error = {errors.to}
	                type = "date"
	            />
	          <input type="submit" className="btn btn-info btn-block mt-4" />
	          </form>

	        </div>
	      </div>
	    </div>
	  </div>
    )
  }

}

AddLeave.propTypes = {
	getEmployeeById: PropTypes.func.isRequired,
	addLeave: PropTypes.func.isRequired,
  	employees: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	employees: state.employees,
	errors: state.errors
})


export default connect(mapStateToProps, { getEmployeeById, addLeave })(withRouter(AddLeave));