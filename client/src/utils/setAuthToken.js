import axios from 'axios';


const setAuthToken = token => {
	if(token){
		//Apply to all the request
		axios.defaults.headers.common['Authorization'] = token;
	} else {
		//Delete the auth header
		delete axios.defaults.headers.common['Authorization']
	}
}

export default setAuthToken;