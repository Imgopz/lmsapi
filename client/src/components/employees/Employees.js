import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEmployees } from '../../actions/employeeActions';
import Spinner from '../common/Spinner';

import EmployeeTable from './EmployeeTable';


class Employees extends Component {
  
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
            <EmployeeTable />
          </div>
      )} else {
          employeesContent = (
          <div>
            <p className="lead text-muted">Please add employees.</p>
          </div>)
      }
      
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Employee Details</h1>
              <p className="lead text-center">Add your employees</p>
              <div className="btn-group mb-4" role="group">
                <Link to="/addemployee" className="btn btn-light">
                  <i className="far fa-address-book text-info mr-1"></i>
                  Add Employee</Link>
              </div>
              {employeesContent}
            </div>
          </div>
        </div>
      </div>
    )
  }

}

Employees.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  employees: PropTypes.object.isRequired
}

const mapStateToProps=(state)=>({
  employees: state.employees
})


export default connect(mapStateToProps, { getEmployees })(Employees);