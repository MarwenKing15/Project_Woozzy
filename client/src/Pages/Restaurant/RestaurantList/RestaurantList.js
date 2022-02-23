import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RestaurantCard from "../../../Components/Restaurant/RestaurantCard/RestaurantCard";
// import RestaurantFilter from "../../../Components/Restaurant/RestaurantFilter/RestaurantFilter";
import { Col, Row, Form } from "react-bootstrap";
import "./RestaurantList.css";
import LoadingPage from "../../LoadingPage/LoadingPage";
import { getRestaurants } from "../../../JS/actions/restaurant";

const RestaurantList = () => {
	const listRestaurants = useSelector(
		(state) => state.restaurantReducer.listRestaurants
	);
	const load = useSelector((state) => state.restaurantReducer.load);
	const dispatch = useDispatch();
	const [country, setCountry] = useState("");

	useEffect(() => {
		dispatch(getRestaurants());
	}, [dispatch]);
	return load ? (
		<LoadingPage />
	) : (
		<div>
			<Row>
				<Col sm={4}>
					<h1>Country</h1>

					<br />
					<Form.Select
						aria-label="Country"
						name="Country"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					>
						<option value="" disabled>
							Country
						</option>
						{listRestaurants.map((restaurant, i) => (
							<option value={restaurant.Restaurant_Location.Country} key={i}>
								{restaurant.Restaurant_Location.Country}
							</option>
						))}
					</Form.Select>
					{/* </Row> */}
				</Col>
				<Col sm={8}>
					{country
						? listRestaurants
								.filter(
									(restaurant) =>
										restaurant.Restaurant_Location.Country === country
								)
								.map((restaurant) => (
									<RestaurantCard
										restaurant={restaurant}
										key={restaurant._id}
									/>
								))
						: listRestaurants.map((restaurant) => (
								<RestaurantCard restaurant={restaurant} key={restaurant._id} />
						  ))}
				</Col>
			</Row>
		</div>
	);
};

export default RestaurantList;
