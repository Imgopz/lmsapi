import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import  TextFieldGroup  from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmployee } from '../../actions/employeeActions';

class AddEmployee extends Component {
  constructor(props){
  	super(props);
  	this.state = {
  		empId: '',
  		empName: '',
  		empEmail: '',
  		errors: {}
  	}
  	this.onChange = this.onChange.bind(this);
  	this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
  	if(nextProps.errors){
  		this.setState({errors: nextProps.errors})
  	}
  }

  onSubmit(e){
  	e.preventDefault();

  	const newEmp = {
  		empId: this.state.empId,
  		empName: this.state.empName,
  		empEmail: this.state.empEmail
  	}

  	this.props.addEmployee(newEmp, this.props.history);
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
	          <h1 className="display-4 text-center">Add Employees</h1>
	          <p className="lead text-center">Add your employees' details here</p>
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

AddEmployee.propTypes = {
	addEmployee: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
})

export default connect(mapStateToProps, { addEmployee })(withRouter(AddEmployee));