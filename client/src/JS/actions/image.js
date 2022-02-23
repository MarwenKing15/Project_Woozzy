import axios from "axios";
import {
	GET_IMAGE_FAIL,
	GET_IMAGE_LOAD,
	GET_IMAGE_SUCCESS,
} from "../actionstypes/image";

export const getImage = (imageID) => async (dispatch) => {
	dispatch({ type: GET_IMAGE_LOAD });
	try {
		let result = await axios.get(`/api/images/${imageID}`);
		// console.log(result);
		dispatch({
			type: GET_IMAGE_SUCCESS,
			payload: result.data,
		});
	} catch (error) {
		dispatch({
			type: GET_IMAGE_FAIL,
			payload: error.response,
		});
	}
};
