import axios from "axios";

import {
	USER_LOAD,
	USER_SUCC,
	USER_FAIL,
	LOGOUT,
	CURRENT_USER_PROFILE,
	UPDATE_SUCC,
	UPDATE_FAIL,
	TOOGLE_TRUE,
	TOOGLE_FALSE,
	GET_USERS_LOAD,
	GET_USERS_SUCC,
	GET_USERS_FAIL,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAIL,
	GET_USER_LOAD,
	GET_USER_SUCC,
	GET_USER_FAIL,
} from "../actionstypes/user";

export const register = (newUser, history) => async (dispatch) => {
	dispatch({ type: USER_LOAD });
	try {
		let result = await axios.post("/api/user/register", newUser);
		dispatch({ type: USER_SUCC, payload: result.data });
		history.push("/Profile");
	} catch (error) {
		dispatch({ type: USER_FAIL, payload: error.response });
	}
};

export const login = (user, history) => async (dispatch) => {
	dispatch({ type: USER_LOAD });
	try {
		let result = await axios.post("/api/user/login", user);
		dispatch({ type: USER_SUCC, payload: result.data });
		history.push("/");
	} catch (error) {
		dispatch({ type: USER_FAIL, payload: error.response.data });
	}
};

export const logout = () => {
	return {
		type: LOGOUT,
	};
};

export const currentUserProfile = () => async (dispatch) => {
	dispatch({ type: USER_LOAD });
	try {
		const config = {
			headers: {
				authorization: localStorage.getItem("token"),
			},
		};
		let result = await axios.get("/api/user/Profile", config);
		dispatch({ type: CURRENT_USER_PROFILE, payload: result });
	} catch (error) {
		dispatch({ type: USER_FAIL, payload: error.response.data });
	}
};

export const toogleTrue = () => {
	return { type: TOOGLE_TRUE };
};

export const toogleFalse = () => {
	return { type: TOOGLE_FALSE };
};

export const editProfile = (editedUser) => async (dispatch) => {
	// dispatch(currentUserProfile());
	try {
		const config = {
			headers: {
				authorization: localStorage.getItem("token"),
			},
		};
		await axios.put(`/api/user/Profile`, editedUser, config);
		dispatch({ type: UPDATE_SUCC });
		dispatch(currentUserProfile());
	} catch (error) {
		dispatch({ type: UPDATE_FAIL, payload: error.response.data });
	}
};

export const getUsers = () => async (dispatch) => {
	dispatch({ type: GET_USERS_LOAD });
	try {
		let result = await axios.get("/api/user/ListOfUsers");
		dispatch({
			type: GET_USERS_SUCC,
			payload: result.data,
		});
	} catch (error) {
		dispatch({
			type: GET_USERS_FAIL,
			payload: error.response,
		});
	}
};

export const deleteUser = (userId) => async (dispatch) => {
	try {
		await axios.delete(`/api/user/${userId}`);
		dispatch({ type: DELETE_USER_SUCCESS });
		dispatch(getUsers());
	} catch (error) {
		dispatch({ type: DELETE_USER_FAIL, payload: error.response.data });
	}
};

export const getOneUser = (userID) => async (dispatch) => {
	dispatch({ type: GET_USER_LOAD });
	try {
		let result = await axios.get(`/api/user/OneUser/${userID}`);
		dispatch({ type: GET_USER_SUCC, payload: result.data });
	} catch (error) {
		dispatch({ type: GET_USER_FAIL, payload: error.response.data });
	}
};

export const upgradeUser = (userID) => async (dispatch) => {
	try {
		const config = {
			headers: {
				authorization: localStorage.getItem("token"),
			},
		};
		console.log({ config });
		await axios.put(`/api/user/admin/manageUsers/${userID}`, null, config);
		dispatch({ type: UPDATE_SUCC });
		dispatch(getUsers());
	} catch (error) {
		dispatch({ type: UPDATE_FAIL, payload: error.response.data });
	}
};
