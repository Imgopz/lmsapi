import { GET_EMPLOYEES, EMPLOYEES_LOADING, DELETE_EMPLOYEE, GET_EMPLOYEE } from '../actions/types';

const initialState = {
	employees: null,
	loading: false
}

export default function(state = initialState, action){
	switch(action.type){
		case EMPLOYEES_LOADING:
			return{
				...state,
				loading: true
			}
		case GET_EMPLOYEES:
			return{
				...state,
				employees: action.payload,
				loading: false
			}
		case DELETE_EMPLOYEE:
			return{
				...state,
				employees: state.employees.filter(employee => employee._id !== action.payload),
				loading: false
			}
		case GET_EMPLOYEE:
			return{
				...state,
				employees: state.employees.filter(employee => employee._id === action.payload),
				loading: false
			}
		default:
			return state;
	}
}