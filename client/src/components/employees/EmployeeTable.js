import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteEmployee } from '../../actions/employeeActions';
import { getEmployees } from '../../actions/employeeActions';




class EmployeeTable extends Component {
  
  onDeleteClick(id){

    this.props.deleteEmployee(id);
  
  }

  render() {

    const { employees } = this.props.employees;
    
    const employee  = employees.map(emp => (
      <tr key={emp._id}>
        <td>{emp.empId}</td>
        <td>{emp.empName}</td>
        <td>{emp.empEmail}</td>
        <td>
          <Link to={`edit-employee/${emp._id}`} className="btn mr-2 btn-info">Edit</Link>
          <button 
            onClick={this.onDeleteClick.bind(this, emp._id)} 
            className="btn btn-danger">Delete
          </button>
        </td>
      </tr>
    ))

    return (
      <div>
        <h4 className='mb-4'>Employees</h4>
        <table className='table'>
          <thead>
            <tr>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Employee Email</th>
            <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employee}
          </tbody>
        </table>
      </div>
    )
  }

}

EmployeeTable.propTypes = {
  deleteEmployee: PropTypes.func.isRequired,
  employees: PropTypes.object.isRequired
}

const mapStateToProps=(state)=>({
  employees: state.employees
})


export default connect(mapStateToProps, { deleteEmployee, getEmployees })(EmployeeTable);