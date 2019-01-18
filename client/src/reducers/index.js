import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import employeeReducer from './employeeReducer';
import leaveReducer from './leaveReducer';




export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	profile: profileReducer,
	employees: employeeReducer,
	leaves: leaveReducer
})

