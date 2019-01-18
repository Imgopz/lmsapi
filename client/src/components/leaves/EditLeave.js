import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import  TextFieldGroup  from '../common/TextFieldGroup';
import  SelectListGroup  from '../common/SelectListGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editLeave } from '../../actions/leaveActions';
import { getLeaveById } from '../../actions/leaveActions';
import isEmpty from '../../validation/is-empty';
import formatDate from '../common/format-date'

class EditLeave extends Component {

  constructor(props){
  	super(props);
  	this.state = {
  		leaveid: props.match.params,
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
  	this.props.getLeaveById(this.state.leaveid.id);
  }

  componentWillReceiveProps(nextProps){
  	if(nextProps.errors){
  		this.setState({errors: nextProps.errors})
  	}

  	if(nextProps.leaves.leaves[0]){
  		const leave = nextProps.leaves.leaves[0]		

  		leave.leaveType = !isEmpty(leave.leaveType) ? leave.leaveType : '';
      	leave.from = !isEmpty(leave.from) ? leave.from : '';
      	leave.to = !isEmpty(leave.to) ? leave.to : '';
  		// Set State

  		this.setState({
	  		empId: leave.empId,
	  		empName: leave.empName,
	  		leaveType: leave.leaveType,
	  		from: formatDate(leave.from),
	  		to: formatDate(leave.to)
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

  	this.props.editLeave( newLeave, this.state.leaveid.id, this.props.history );
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
	          <Link to='/leaves' className="btn btn-light">
	            Go Back
	          </Link>
	          <h1 className="display-4 text-center">Edit Leaves</h1>
	          <p className="lead text-center">Edit leave details for your employees' here</p>
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

EditLeave.propTypes = {
	getLeaveById: PropTypes.func.isRequired,
	editLeave: PropTypes.func.isRequired,
  	leaves: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	leaves: state.leaves,
	errors: state.errors
})


export default connect(mapStateToProps, { getLeaveById, editLeave })(withRouter(EditLeave));