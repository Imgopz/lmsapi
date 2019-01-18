import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmployees } from '../../actions/employeeActions';
import Spinner from '../common/Spinner';

import LeaveTable from './LeaveTable';


class Leaves extends Component {
  
  componentDidMount(){
      this.props.getEmployees();
  }
  

  render() {
    const { employees, loading } = this.props.employees;

    let employeesContent;

    if(employees === null || loading){
        employeesContent = <Spinner />;
    } else {
      
      if(Object.keys(employees).length > 0 ){
      employeesContent = (
          <div>
            <LeaveTable />
          </div>
      )} else {
          employeesContent = (
          <div>
            <p className="lead text-muted">Please add leaves.</p>
          </div>)
      }
      
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Leave Details</h1>
              <p className="lead text-center">Add leave details for your employees</p>
              {employeesContent}
            </div>
          </div>
        </div>
      </div>
    )
  }

}

Leaves.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  employees: PropTypes.object.isRequired
}

const mapStateToProps=(state)=>({
  employees: state.employees
})


export default connect(mapStateToProps, { getEmployees })(Leaves);