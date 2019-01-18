import { GET_LEAVES, LEAVES_LOADING, DELETE_LEAVE, GET_LEAVE } from '../actions/types';

const initialState = {
	leaves: null,
	loading: false
}

export default function(state = initialState, action){
	switch(action.type){
		case LEAVES_LOADING:
			return{
				...state,
				loading: true
			}
		case GET_LEAVES:
			return{
				...state,
				leaves: action.payload,
				loading: false
			}
		case DELETE_LEAVE:
			return{
				...state,
				leaves: state.leaves.filter(leave => leave._id !== action.payload),
				loading: false
			}
		case GET_LEAVE:
			return{
				...state,
				leaves: state.leaves.filter(leave => leave._id === action.payload),
				loading: false
			}
		default:
			return state;
	}
}