import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getEmployees } from '../../actions/employeeActions';




class LeaveTable extends Component {
  
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
          <Link to={`add-leave/${emp._id}`} className="btn mr-2 btn-success">Add Leave</Link>
          <Link to={`view-leave/${emp._id}`} className="btn mr-2 btn-info">View Leaves</Link>
        </td>
      </tr>
    ))

    return (
      <div>
        <h4 className='mb-4'>Leave details for each employee</h4>
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

LeaveTable.propTypes = {
  employees: PropTypes.object.isRequired
}

const mapStateToProps=(state)=>({
  employees: state.employees
})


export default connect(mapStateToProps, { getEmployees })(LeaveTable);