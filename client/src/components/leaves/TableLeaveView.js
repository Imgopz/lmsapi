import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLeaves, deleteLeave } from '../../actions/leaveActions';
import Moment from 'react-moment'


class TableLeaveView extends Component {

  onDeleteClick(id){

    this.props.deleteLeave(id);
  
  }

  render() {

    const { leaves } = this.props.leaves;
    
    const leave  = leaves.map(leave => (
      <tr key={leave._id}>
        <td>{leave.empId}</td>
        <td>{leave.empName}</td>
        <td>{leave.leaveType}</td>
        <td>
        <Moment format='YYYY/MM/DD'>{leave.from}</Moment>
        </td>
        <td>
        <Moment format='YYYY/MM/DD'>{leave.to}</Moment>
        </td>
        <td>
          <Link to={`/edit-leave/${leave._id}`} className="btn mr-2 btn-info">Edit</Link>
          <button onClick={this.onDeleteClick.bind(this, leave._id)}
            className="btn btn-danger">Delete
          </button>
        </td>
      </tr>
    ))

    return (
      <div>
        <Link to="/leaves" className="btn btn-light">
              Go Back
        </Link>
        <h4 className='mb-4'>Leaves</h4>
        <table className='table'>
          <thead>
            <tr>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leave}
          </tbody>
        </table>
      </div>
    )
  }

}

TableLeaveView.propTypes = {
  deleteLeave: PropTypes.func.isRequired,
  leaves: PropTypes.object.isRequired
  
}

const mapStateToProps=(state)=>({
  leaves: state.leaves
})


export default connect(mapStateToProps, { getLeaves, deleteLeave })(TableLeaveView);