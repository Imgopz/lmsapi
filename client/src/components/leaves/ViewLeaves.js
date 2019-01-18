import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLeaves } from '../../actions/leaveActions';
import Spinner from '../common/Spinner';

import TableLeaveView from './TableLeaveView';
  

class ViewLeaves extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      empid: props.match.params
    }
  }

  componentDidMount(){
      this.props.getLeaves(this.state.empid.id);
  }
  

  render() {

    const { leaves, loading } = this.props.leaves;

    let leavesContent;

    if(leaves === null || loading){
        leavesContent = <Spinner />;
    } else {
      
      if(Object.keys(leaves).length > 0 ){
      leavesContent = (
          <div>
            <TableLeaveView emid = {this.state.empid.id}/>
          </div>
      )} else {
          leavesContent = (
          <div>
            <Link to="/leaves" className="btn btn-light">
                Go Back
            </Link>
            <p className="lead text-muted">Please go back and add leaves.</p>
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
              {leavesContent}
            </div>
          </div>
        </div>
      </div>
    )
  }

}

ViewLeaves.propTypes = {
  getLeaves: PropTypes.func.isRequired,
  leaves: PropTypes.object.isRequired
}

const mapStateToProps=(state)=>({
  leaves: state.leaves
})


export default connect(mapStateToProps, { getLeaves })(ViewLeaves);