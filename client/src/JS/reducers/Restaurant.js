import {
	GET_RESTAURANTS_FAIL,
	GET_RESTAURANTS_LOAD,
	GET_RESTAURANTS_SUCCESS,
	GET_RESTAURANT_FAIL,
	GET_RESTAURANT_LOAD,
	GET_RESTAURANT_SUCCESS,
	TOOGLE_FALSE,
	TOOGLE_TRUE,
} from "../actionstypes/restaurant";

const initState = {
	load: false,
	listRestaurants: [],
	restaurantFound: {},
	errors: [],
	edit: false,
};
export const restaurantReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case GET_RESTAURANTS_LOAD:
			return { ...state, load: true };
		case GET_RESTAURANTS_SUCCESS:
			return {
				...state,
				load: false,
				listRestaurants: payload.listRestaurants,
			};
		case GET_RESTAURANTS_FAIL:
			return { ...state, load: false, errors: payload.errors };
		case GET_RESTAURANT_LOAD:
			return { ...state, load: true };
		case GET_RESTAURANT_SUCCESS:
			return {
				...state,
				load: false,
				restaurantFound: payload.restaurantFound,
			};
		case GET_RESTAURANT_FAIL:
			return { ...state, load: false, errors: payload.errors };
		case TOOGLE_TRUE:
			return { ...state, edit: true };
		case TOOGLE_FALSE:
			return { ...state, edit: false };
		default:
			return state;
	}
};

export default restaurantReducer;
