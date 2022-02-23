import {
	ADD_HOTEL_REVIEW_FAIL,
	GET_HOTELS_FAIL,
	GET_HOTELS_LOAD,
	GET_HOTELS_SUCCESS,
	GET_HOTEL_FAIL,
	GET_HOTEL_LOAD,
	GET_HOTEL_SUCCESS,
	TOOGLE_FALSE,
	TOOGLE_TRUE,
} from "../actionstypes/hotel";

const initState = {
	load: false,
	listHotels: [],
	hotelFound: {},
	errors: [],
	edit: false,
};
export const hotelReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case GET_HOTELS_LOAD:
			return { ...state, load: true };
		case GET_HOTELS_SUCCESS:
			return {
				...state,
				load: false,
				listHotels: payload.listHotels,
			};
		case GET_HOTELS_FAIL:
			return { ...state, load: false, errors: payload.errors };
		case GET_HOTEL_LOAD:
			return { ...state, load: true };
		case GET_HOTEL_SUCCESS:
			return {
				...state,
				load: false,
				hotelFound: payload.hotelFound,
			};
		case GET_HOTEL_FAIL:
			return { ...state, load: false, errors: payload.errors };
		case TOOGLE_TRUE:
			return { ...state, edit: true };
		case TOOGLE_FALSE:
			return { ...state, edit: false };

		case ADD_HOTEL_REVIEW_FAIL:
			return { ...state, load: false, errors: payload };
		default:
			return state;
	}
};

export default hotelReducer;
