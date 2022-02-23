import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Rating from "@mui/material/Rating";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import { getUsers } from "../../../JS/actions/user";
import {
	getRestaurant,
	postRestaurantReview,
} from "../../../JS/actions/restaurant";
import LoadingPage from "../../LoadingPage/LoadingPage";
import RestaurantReviewCard from "../../../Components/Restaurant/RestaurantReviewCard/RestaurantReviewCard";

import "./RestaurantPage.scss";

const RestaurantPage = ({ location, match }) => {
	const dispatch = useDispatch();
	const load = useSelector((state) => state.restaurantReducer.load);

	const restaurant = location.state;
	useEffect(() => {
		dispatch(getUsers());
		dispatch(getRestaurant(match.params._id));
	}, [dispatch, match.params._id]);

	const restaurantFound = useSelector(
		(state) => state.restaurantReducer.restaurantFound
	);

	const [postReview, setPostReview] = useState({
		Review: "",
		Rating: 1,
	});
	const handleChange = (e) => {
		setPostReview({ ...postReview, [e.target.name]: e.target.value });
		setPostReview({ Review: "", Rating: 1 });
	};

	return load ? (
		<LoadingPage />
	) : (
		<div>
			<div className="cardd">
				<Row>
					<Col>
						<img
							className="d-block w-100 card__image"
							src={`../../../../${restaurant.Restaurant_Image}`}
							alt="Restaurant Img"
						/>
					</Col>
					<Col style={{ textAlign: "left", margin: "90px" }}>
						<div className="card__content">
							<h6 className="card__location">
								<FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
								{`${restaurant.Restaurant_Location.Street}
								 ${restaurant.Restaurant_Location.City}, 
								  ${restaurant.Restaurant_Location.Country} 
						 `}
							</h6>
							<span className="card__title">{restaurant.Restaurant_Name}</span>

							<Row>
								<Col>
									<ul className="DescList">
										{restaurant.Restaurant_Description.map((desc, i) => (
											<li key={i}>{desc}</li>
										))}
									</ul>
								</Col>
								<Col>
									<ul className="DescList">
										{restaurant.Restaurant_Cuisines.map((desc, i) => (
											<li key={i}>{desc}</li>
										))}
									</ul>
								</Col>
							</Row>
							<Col>
								<Button
									className="bookBtn"
									href={restaurant.Restaurant_Website}
									target="_blank"
								>
									Book
								</Button>
							</Col>
						</div>
					</Col>
				</Row>
			</div>

			<div className="reviewDiv">
				{restaurantFound.Restaurant_Reviews?.map((review) => (
					<RestaurantReviewCard review={review} key={review._id} />
				))}
			</div>
			<br />
			<div className="bigPostDiv">
				<div className="postDiv">
					<h2>Post A Review</h2>
					<Rating
						name="Rating"
						value={postReview.Rating}
						precision={0.5}
						onChange={handleChange}
					/>
					<Form.Control
						as="textarea"
						name="Review"
						value={postReview.Review}
						rows={3}
						style={{ textAlign: "center" }}
						onChange={handleChange}
					/>
					<br />
					<Button
						onClick={() => {
							dispatch(postRestaurantReview(postReview, restaurant._id));
							setPostReview({ Review: "", Rating: 1 });
						}}
					>
						Submit
					</Button>
				</div>
			</div>
			<br />
		</div>
	);
};

export default RestaurantPage;
