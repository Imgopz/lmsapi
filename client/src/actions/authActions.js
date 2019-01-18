import { GET_ERRORS, SET_CURRENT_USER } from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

//Register user
export const registerUser = (userData, history) => dispatch => {
	axios.post('/api/users/register', userData)
  	.then(res => history.push('/login'))
  	.catch(err => 
  		dispatch({
  			type: GET_ERRORS,
  			payload: err.response.data
  		})
  	);
};

// Login - Get user token
export const loginUser = userData => dispatch => {
	axios.post('/api/users/login', userData)
  	.then(res => {
  		//save token to local storage
  		const { token } = res.data;
  		localStorage.setItem('jwtToken', token);
  		// set token to auth header
  		setAuthToken(token);
  		// Decode token to get user data
  		const decoded = jwt_decode(token);
  		// Set current user
  		dispatch(setCurrentUser(decoded));
  	})
  	.catch(err => 
  		dispatch({
  			type: GET_ERRORS,
  			payload: err.response.data
  		})
  	);
};


// Set logged in user

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
}

// Log out user
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem('jwtToken');
    // Remove token from authHeader
    setAuthToken(false);
    // Set current user to empty object which will also set isAuthenticated to false
    dispatch(setCurrentUser({}));
}