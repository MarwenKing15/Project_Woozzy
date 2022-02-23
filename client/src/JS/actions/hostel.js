import axios from "axios";
import {
	ADD_HOSTEL_FAIL,
	ADD_HOSTEL_REVIEW_FAIL,
	ADD_HOSTEL_REVIEW_SUCCESS,
	ADD_HOSTEL_SUCCESS,
	DELETE_HOSTEL_FAIL,
	DELETE_HOSTEL_SUCCESS,
	GET_HOSTELS_FAIL,
	GET_HOSTELS_LOAD,
	GET_HOSTELS_SUCCESS,
	GET_HOSTEL_FAIL,
	GET_HOSTEL_LOAD,
	GET_HOSTEL_SUCCESS,
	TOOGLE_FALSE,
	TOOGLE_TRUE,
} from "../actionstypes/hostel";

export const getHostels = () => async (dispatch) => {
	dispatch({ type: GET_HOSTELS_LOAD });
	try {
		let result = await axios.get("/api/hostel/hostel");
		dispatch({
			type: GET_HOSTELS_SUCCESS,
			payload: result.data,
		});
	} catch (error) {
		dispatch({
			type: GET_HOSTELS_FAIL,
			payload: error.response,
		});
	}
};

export const getHostel = (hostelId) => async (dispatch) => {
	dispatch({ type: GET_HOSTEL_LOAD });
	try {
		let result = await axios.get(`/api/hostel/hostelInfo/${hostelId}`);
		dispatch({ type: GET_HOSTEL_SUCCESS, payload: result.data });
	} catch (error) {
		dispatch({ type: GET_HOSTEL_FAIL, payload: error.response });
	}
};

export const toogleTrue = () => {
	return { type: TOOGLE_TRUE };
};

export const toogleFalse = () => {
	return { type: TOOGLE_FALSE };
};

export const deleteHostel = (hostelId) => async (dispatch) => {
	try {
		const config = {
			headers: {
				authorization: localStorage.getItem("token"),
			},
		};
		await axios.delete(`/api/hostel/admin/manageHostels/${hostelId}`, config);
		dispatch({ type: DELETE_HOSTEL_SUCCESS });
		dispatch(getHostels());
	} catch (error) {
		dispatch({ type: DELETE_HOSTEL_FAIL, payload: error.response.data });
	}
};

export const postHostelReview = (review, hostelID) => async (dispatch) => {
	try {
		const config = {
			headers: {
				authorization: localStorage.getItem("token"),
			},
		};
		await axios.put(`/api/hostel/Review/${hostelID}`, review, config);
		dispatch({ type: ADD_HOSTEL_REVIEW_SUCCESS });
		dispatch(getHostel(hostelID));
	} catch (error) {
		dispatch({ type: ADD_HOSTEL_REVIEW_FAIL, payload: error.response });
	}
};

export const addHostel = (newHostel) => async (dispatch) => {
	try {
		const config = {
			headers: {
				authorization: localStorage.getItem("token"),
			},
		};
		await axios.post("/api/hostel/admin/manageHostels/", newHostel, config);
		dispatch({ type: ADD_HOSTEL_SUCCESS });
		// dispatch(getHostels());
	} catch (error) {
		dispatch({ type: ADD_HOSTEL_FAIL, payload: error.response.data });
	}
};
