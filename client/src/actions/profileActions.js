import axios from 'axios'; 
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';


//Get current profile
export const getCurrentProfile = () => dispatch => {

	dispatch(setProfileLoading());
	axios.get('api/users/current')
	.then(res => dispatch ({
		type: GET_PROFILE,
		payload: res.data
	}))
	.catch(err => dispatch ({
		type: GET_PROFILE,
		payload: null
	}) )

}

// Profile loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	}
}


// clear loading
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	}
}