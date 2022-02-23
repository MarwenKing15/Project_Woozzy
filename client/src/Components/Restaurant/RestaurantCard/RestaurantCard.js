import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

// import { useDispatch } from "react-redux";

import "./RestaurantCard.css";
// import { getHostel } from "../../../JS/actions/hotel";

const RestaurantCard = ({ restaurant }) => {
	// const dispatch = useDispatch();

	return (
		<div>
			<div className="courses-container">
				<div className="course">
					<img
						className="course-preview"
						src={`../../../../${restaurant.Restaurant_Image}`}
						alt="Restaurant Img"
					/>
					<div className="course-info">
						<div className="progress-container">
							<Rating
								name="read-only"
								value={restaurant.Restaurant_Rating}
								readOnly
								precision={0.5}
							/>
						</div>
						<div className="infoDiv">
							<h6>{restaurant.Restaurant_Location.Country}</h6>
							<h2>{restaurant.Restaurant_Name}</h2>
						</div>
						<Link
							to={{
								pathname: `/restaurantInfo/${restaurant._id}`,
								state: restaurant,
							}}
							style={{ textDecoration: "none" }}
						>
							<button
								className="Cardbtn"
								// onClick={() => dispatch(getRestaurant(restaurant._id))}
							>
								View Deal
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RestaurantCard;
