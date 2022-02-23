import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ManageRestaurantCard from "../../../Components/Restaurant/ManageRestaurantCard/ManageRestaurantCard";
import { getRestaurants, toogleFalse } from "../../../JS/actions/restaurant";
import LoadingPage from "../../LoadingPage/LoadingPage";

const ManageRestaurants = () => {
	const listRestaurants = useSelector(
		(state) => state.restaurantReducer.listRestaurants
	);

	const load = useSelector((state) => state.restaurantReducer.load);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getRestaurants());
	}, [dispatch]);

	return load ? (
		<LoadingPage />
	) : (
		<div>
			<br />
			<div className="AddBtn">
				<Link to="/addRestaurant">
					<Button onClick={() => dispatch(toogleFalse())}>
						Add Restaurant
					</Button>
				</Link>{" "}
			</div>
			<br />
			<div className="contactContainer">
				{listRestaurants.map((restaurant) => (
					<ManageRestaurantCard restaurant={restaurant} key={restaurant._id} />
				))}
			</div>
		</div>
	);
};

export default ManageRestaurants;
