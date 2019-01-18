import axios from 'axios'; 
import { GET_ERRORS, GET_EMPLOYEES, EMPLOYEES_LOADING, DELETE_EMPLOYEE, GET_EMPLOYEE } from './types';


//Add new employee
export const addEmployee = (newEmp, history) => dispatch => {
	
	axios.post('api/employees/addemployee', newEmp)
	.then(employees => history.push('/employees'))
	.catch(err => dispatch ({
		type: GET_ERRORS,
		payload: err.response.data
	}) )

}

//Get all employees
export const getEmployees = () => dispatch => {

	dispatch(setEmployeesLoading());
	
	axios.get('api/employees/')
	.then(res => dispatch ({
		type: GET_EMPLOYEES,
		payload: res.data
	}))
	.catch(err => dispatch ({
		type: GET_EMPLOYEES,
		payload: null
	}) )

}

//Delete Employee
// export const deleteEmployee = (id, history) => dispatch => {
	
// 	axios.delete(`api/employees/${id}`)
// 	.then(res => history.push('/employees'))
// 	// .then(res => history.push('/employees'))
// 	.catch(err => dispatch ({
// 		type: GET_EMPLOYEES,
// 		payload: null
// 	}) )

// }


// Delete Employee
export const deleteEmployee = id => dispatch => {
  axios
    .delete(`/api/employees/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_EMPLOYEE,
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


// Edit Employee
export const editEmployee = (newEmp, id, history) => dispatch => {
  axios
    .post(`/api/employees/${id}`, newEmp)
    .then(res => history.push('/employees'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


//Get employee by id to edit it
export const getEmployeeById = (id) => dispatch => {
	
	axios.get(`/api/employees/${id}`)
	.then(res => dispatch ({
		type: GET_EMPLOYEE,
		payload: id
	}))
	.catch(err => dispatch ({
		type: GET_ERRORS,
		payload: err.response.data
	}) )

}



// Profile loading
export const setEmployeesLoading = () => {
	return {
		type: EMPLOYEES_LOADING
	}
}
