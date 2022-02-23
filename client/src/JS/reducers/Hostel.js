import {
	ADD_HOSTEL_REVIEW_FAIL,
	GET_HOSTELS_FAIL,
	GET_HOSTELS_LOAD,
	GET_HOSTELS_SUCCESS,
	GET_HOSTEL_FAIL,
	GET_HOSTEL_LOAD,
	GET_HOSTEL_SUCCESS,
	TOOGLE_FALSE,
	TOOGLE_TRUE,
} from "../actionstypes/hostel";

const initState = {
	load: false,
	listHostels: [],
	hostelFound: {},
	errors: [],
	edit: false,
};
export const hostelReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case GET_HOSTELS_LOAD:
			return { ...state, load: true };
		case GET_HOSTELS_SUCCESS:
			return {
				...state,
				load: false,
				listHostels: payload.listHostels,
			};
		case GET_HOSTELS_FAIL:
			return { ...state, load: false, errors: payload.errors };
		case GET_HOSTEL_LOAD:
			return { ...state, load: true };
		case GET_HOSTEL_SUCCESS:
			return {
				...state,
				load: false,
				hostelFound: payload.hostelFound,
			};
		case GET_HOSTEL_FAIL:
			return { ...state, load: false, errors: payload };
		case TOOGLE_TRUE:
			return { ...state, edit: true };
		case TOOGLE_FALSE:
			return { ...state, edit: false };
		case ADD_HOSTEL_REVIEW_FAIL:
			return { ...state, load: false, errors: payload };
		default:
			return state;
	}
};

export default hostelReducer;
