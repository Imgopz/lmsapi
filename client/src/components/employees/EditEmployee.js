import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import  TextFieldGroup  from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEmployeeById, editEmployee } from '../../actions/employeeActions';

class EditEmployee extends Component {
  
  constructor(props){
  	super(props);
  	
  	this.state = {
  		empid: props.match.params,
  		empId: '',
  		empName: '',
  		empEmail: '',
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

  		// Set State
  		this.setState({
	  		empId: employee.empId,
	  		empName: employee.empName,
	  		empEmail: employee.empEmail
	  	});
  	}
  }

  onSubmit(e){
  	e.preventDefault();

  	const newEmp = {
  		empId: this.state.empId,
  		empName: this.state.empName,
  		empEmail: this.state.empEmail
  	}

  	this.props.editEmployee( newEmp, this.state.empid.id, this.props.history );

  }

  onChange(e){
  	this.setState({[e.target.name]: e.target.value});
  }

  render() {

  	const { errors } = this.state;

    return (
     <div className="add-employee">
	    <div className="container">
	      <div className="row">
	        <div className="col-md-8 m-auto">
	          <Link to="/employees" className="btn btn-light">
	            Go Back
	          </Link>
	          <h1 className="display-4 text-center">Edit Employees</h1>
	          <p className="lead text-center">Edit your employee's details here</p>
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
	            <TextFieldGroup
	                placeholder="* Employee Email"
	                name="empEmail"
	                value = {this.state.empEmail}
	                onChange = {this.onChange} 
	                error = {errors.empEmail}
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

EditEmployee.propTypes = {
	getEmployeeById: PropTypes.func.isRequired,
	editEmployee: PropTypes.func,
	employees: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	employees: state.employees,
	errors: state.errors
})

export default connect(mapStateToProps, { getEmployeeById, editEmployee })(withRouter(EditEmployee));