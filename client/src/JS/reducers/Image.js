import {
	GET_IMAGE_FAIL,
	GET_IMAGE_LOAD,
	GET_IMAGE_SUCCESS,
} from "../actionstypes/image";

const initState = {
	load: false,
	// listHotels: [],
	imageFound: {},
	errors: [],
	edit: false,
};
export const imageReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case GET_IMAGE_LOAD:
			return { ...state, load: true };
		case GET_IMAGE_SUCCESS:
			return {
				...state,
				load: false,
				imageFound: payload.imageFound,
			};
		case GET_IMAGE_FAIL:
			return { ...state, load: false, errors: payload.errors };

		default:
			return state;
	}
};

export default imageReducer;
