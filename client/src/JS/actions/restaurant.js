import axios from "axios";
import {
	ADD_RESTAURANT_FAIL,
	ADD_RESTAURANT_REVIEW_FAIL,
	ADD_RESTAURANT_REVIEW_SUCCESS,
	ADD_RESTAURANT_SUCCESS,
	DELETE_RESTAURANT_FAIL,
	DELETE_RESTAURANT_SUCCESS,
	GET_RESTAURANTS_FAIL,
	GET_RESTAURANTS_LOAD,
	GET_RESTAURANTS_SUCCESS,
	GET_RESTAURANT_FAIL,
	GET_RESTAURANT_LOAD,
	GET_RESTAURANT_SUCCESS,
	TOOGLE_FALSE,
	TOOGLE_TRUE,
} from "../actionstypes/restaurant";

export const getRestaurants = () => async (dispatch) => {
	dispatch({ type: GET_RESTAURANTS_LOAD });
	try {
		let result = await axios.get("/api/restaurant/restaurant");
		dispatch({
			type: GET_RESTAURANTS_SUCCESS,
			payload: result.data,
		});
	} catch (error) {
		dispatch({
			type: GET_RESTAURANTS_FAIL,
			payload: error.response,
		});
	}
};

export const getRestaurant = (restaurantId) => async (dispatch) => {
	dispatch({ type: GET_RESTAURANT_LOAD });
	try {
		let result = await axios.get(`/api/restaurant/restaurant/${restaurantId}`);
		dispatch({ type: GET_RESTAURANT_SUCCESS, payload: result.data });
	} catch (error) {
		dispatch({ type: GET_RESTAURANT_FAIL, payload: error.response });
	}
};

export const toogleTrue = () => {
	return { type: TOOGLE_TRUE };
};

export const toogleFalse = () => {
	return { type: TOOGLE_FALSE };
};

export const addRestaurant = (newRestaurant) => async (dispatch) => {
	try {
		const config = {
			headers: {
				authorization: localStorage.getItem("token"),
			},
		};
		await axios.post(
			"/api/restaurant/admin/manageRestaurants/",
			newRestaurant,
			config
		);
		dispatch({ type: ADD_RESTAURANT_SUCCESS });
	} catch (error) {
		dispatch({ type: ADD_RESTAURANT_FAIL, payload: error.response.data });
	}
};

export const deleteRestaurant = (restaurantId) => async (dispatch) => {
	try {
		const config = {
			headers: {
				authorization: localStorage.getItem("token"),
			},
		};
		await axios.delete(
			`/api/restaurant/admin/manageRestaurants/${restaurantId}`,
			config
		);
		dispatch({ type: DELETE_RESTAURANT_SUCCESS });
		dispatch(getRestaurants());
	} catch (error) {
		dispatch({ type: DELETE_RESTAURANT_FAIL, payload: error.response.data });
	}
};

export const postRestaurantReview =
	(review, restaurantID) => async (dispatch) => {
		try {
			const config = {
				headers: {
					authorization: localStorage.getItem("token"),
				},
			};
			await axios.put(`/api/restaurant/Review/${restaurantID}`, review, config);
			dispatch({ type: ADD_RESTAURANT_REVIEW_SUCCESS });
			dispatch(getRestaurant(restaurantID));
		} catch (error) {
			dispatch({ type: ADD_RESTAURANT_REVIEW_FAIL, payload: error.response });
		}
	};
