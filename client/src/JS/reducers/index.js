import { combineReducers } from "redux";
import userReducer from "./User";
import hotelReducer from "./Hotel";
import hostelReducer from "./Hostel";
import imageReducer from "./Image";
import restaurantReducer from "./Restaurant";

const rootReducer = combineReducers({
	userReducer,
	hotelReducer,
	imageReducer,
	restaurantReducer,
	hostelReducer,
});

export default rootReducer;
