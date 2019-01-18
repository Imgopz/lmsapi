import axios from 'axios'; 
import { GET_ERRORS, GET_LEAVES, LEAVES_LOADING, DELETE_LEAVE, GET_LEAVE } from './types';

//Add new leave
export const addLeave = (newLeave, id, history) => dispatch => {
	axios.post(`/api/leaves/addLeave/${id}`, newLeave)
	.then(leaves => history.push('/leaves'))
	.catch(err => dispatch ({
		type: GET_ERRORS,
		payload: err.response.data
	}) );
};

//Edit added leave
export const editLeave = (newLeave, id, history) => dispatch => {
  axios.post(`/api/leaves/${id}`, newLeave)
  .then(leaves => history.push('/leaves'))
  .catch(err => dispatch ({
    type: GET_ERRORS,
    payload: err.response.data
  }) );
};


//Get leaves by emp_id
export const getLeaves = (id) => dispatch => {	
	dispatch(setLeavesLoading());
	axios.get(`/api/leaves/${id}`)
	.then(res => dispatch ({
		type: GET_LEAVES,
		payload: res.data
	}))
	.catch(err => dispatch ({
		type: GET_LEAVES,
		payload: null
	}) )

}


// leaves loading
export const setLeavesLoading = () => {
	return {
		type: LEAVES_LOADING
	}
}


// Delete Leave
export const deleteLeave = id => dispatch => {
  axios
    .delete(`/api/leaves/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_LEAVE,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get leave by Leave id
export const getLeaveById = id => dispatch => {
  axios
    .get(`/api/leaves/${id}`)
    .then(res =>
      dispatch({
        type: GET_LEAVE,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

