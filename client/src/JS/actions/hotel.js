import axios from "axios";
import {
	ADD_HOTEL_FAIL,
	ADD_HOTEL_REVIEW_FAIL,
	ADD_HOTEL_REVIEW_SUCCESS,
	ADD_HOTEL_SUCCESS,
	DELETE_HOTEL_FAIL,
	DELETE_HOTEL_SUCCESS,
	GET_HOTELS_FAIL,
	GET_HOTELS_LOAD,
	GET_HOTELS_SUCCESS,
	GET_HOTEL_FAIL,
	GET_HOTEL_LOAD,
	GET_HOTEL_SUCCESS,
	TOOGLE_FALSE,
	TOOGLE_TRUE,
	UPDATE_FAIL,
	UPDATE_SUCC,
} from "../actionstypes/hotel";

export const getHotels = () => async (dispatch) => {
	dispatch({ type: GET_HOTELS_LOAD });
	try {
		let result = await axios.get("/api/hotel/hotel");
		dispatch({
			type: GET_HOTELS_SUCCESS,
			payload: result.data,
		});
	} catch (error) {
		dispatch({
			type: GET_HOTELS_FAIL,
			payload: error.response,
		});
	}
};

export const getHotel = (hotelId) => async (dispatch) => {
	dispatch({ type: GET_HOTEL_LOAD });
	try {
		let result = await axios.get(`/api/hotel/hotelInfo/${hotelId}`);
		dispatch({ type: GET_HOTEL_SUCCESS, payload: result.data });
	} catch (error) {
		dispatch({ type: GET_HOTEL_FAIL, payload: error.response.data });
	}
};

export const toogleTrue = () => {
	return { type: TOOGLE_TRUE };
};

export const toogleFalse = () => {
	return { type: TOOGLE_FALSE };
};

export const addHotel = (newHotel) => async (dispatch) => {
	try {
		const config = {
			headers: {
				authorization: localStorage.getItem("token"),
			},
		};
		await axios.post("/api/hotel/admin/manageHotels/", newHotel, config);
		dispatch({ type: ADD_HOTEL_SUCCESS });
		// dispatch(getHotels());
	} catch (error) {
		dispatch({ type: ADD_HOTEL_FAIL, payload: error.response.data });
	}
};

export const deleteHotel = (hotelId) => async (dispatch) => {
	try {
		const config = {
			headers: {
				authorization: localStorage.getItem("token"),
			},
		};
		await axios.delete(`/api/hotel/admin/manageHotels/${hotelId}`, config);
		dispatch({ type: DELETE_HOTEL_SUCCESS });
		dispatch(getHotels());
	} catch (error) {
		dispatch({ type: DELETE_HOTEL_FAIL, payload: error.response.data });
	}
};

export const postHotelReview = (review, hotelID) => async (dispatch) => {
	try {
		const config = {
			headers: {
				authorization: localStorage.getItem("token"),
			},
		};
		await axios.put(`/api/hotel/Review/${hotelID}`, review, config);
		dispatch({ type: ADD_HOTEL_REVIEW_SUCCESS });
		dispatch(getHotel(hotelID));
	} catch (error) {
		dispatch({ type: ADD_HOTEL_REVIEW_FAIL, payload: error.response });
	}
};

export const editHotel =
	(hotelId, editedHoteel, history) => async (dispatch) => {
		try {
			const config = {
				headers: {
					authorization: localStorage.getItem("token"),
				},
			};
			await axios.put(
				`/api/hotel/admin/manageHotels/${hotelId}`,
				editedHoteel,
				config
			);
			dispatch({ type: UPDATE_SUCC });
			history.push("/manageHotels");

			// dispatch(currentUserProfile());
		} catch (error) {
			dispatch({ type: UPDATE_FAIL, payload: error.response.data });
		}
	};
