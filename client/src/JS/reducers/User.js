import {
	USER_LOAD,
	USER_SUCC,
	USER_FAIL,
	LOGOUT,
	CURRENT_USER_PROFILE,
	TOOGLE_TRUE,
	TOOGLE_FALSE,
	// UPDATE_SUCC,
	UPDATE_FAIL,
	GET_USERS_LOAD,
	GET_USERS_SUCC,
	GET_USERS_FAIL,
	GET_USER_LOAD,
	GET_USER_SUCC,
	GET_USER_FAIL,
} from "../actionstypes/user";

const initState = {
	load: false,
	listUser: [],
	user: {},
	userFound: {},
	errors: [],
	isAuth: false,
	edit: false,
};

export const userReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case USER_LOAD:
			return { ...state, load: true };
		case USER_SUCC:
			localStorage.setItem("token", payload.token);
			return { ...state, load: false, user: payload.user, isAuth: true };
		case USER_FAIL:
			return { ...state, load: false, errors: payload.errors, isAuth: false };
		case LOGOUT:
			localStorage.removeItem("token");
			return { ...state, load: false, user: {}, errors: [], isAuth: false };
		case CURRENT_USER_PROFILE:
			return { ...state, load: false, user: payload.data, isAuth: true };
		case GET_USER_LOAD:
			return { ...state, load: true };
		case GET_USER_SUCC:
			return {
				...state,
				load: false,
				userFound: payload.userFound,
			};
		case GET_USER_FAIL:
			return { ...state, load: false, errors: payload.errors };
		case TOOGLE_TRUE:
			return { ...state, edit: true };
		case TOOGLE_FALSE:
			return { ...state, edit: false };
		case GET_USERS_LOAD:
			return { ...state, load: true };
		case GET_USERS_SUCC:
			return {
				...state,
				load: false,
				listUser: payload.listUser,
			};
		case GET_USERS_FAIL:
			return { ...state, load: false, errors: payload.errors };
		// case UPDATE_SUCC:
		// 	return { ...state, load: false, user: payload.user, };
		case UPDATE_FAIL:
			return { ...state, load: false, errors: payload.errors };
		default:
			return state;
	}
};

export default userReducer;
