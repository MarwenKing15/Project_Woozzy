import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Rating from "@mui/material/Rating";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import LoadingPage from "../../LoadingPage/LoadingPage";
import HotelReviewCard from "../HotelReviewCard/HotelReviewCard";
import { getHotel, postHotelReview } from "../../../JS/actions/hotel";
import { getUsers } from "../../../JS/actions/user";

import "./HotelPage.scss";

const HotelPage = ({ location, match }) => {
	const dispatch = useDispatch();
	const load = useSelector((state) => state.hotelReducer.load);
	const hotelFound = useSelector((state) => state.hotelReducer.hotelFound);

	const hotel = location.state;
	useEffect(() => {
		dispatch(getUsers());
		dispatch(getHotel(match.params._id));
	}, [dispatch, match.params._id]);

	const [postReview, setPostReview] = useState({
		Review: "",
		Rating: 1,
	});
	const handleChange = (e) => {
		setPostReview({ ...postReview, [e.target.name]: e.target.value });
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
							src={`../../../../${hotel.Hotel_Image}`}
							alt="hotel Img"
						/>
					</Col>
					<Col style={{ textAlign: "left", margin: "90px" }}>
						<h6 className="card__location">
							<FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
							{`${hotel.Hotel_Location.Street}
								 ${hotel.Hotel_Location.City}, 
								  ${hotel.Hotel_Location.Country} 
						 `}
						</h6>
						<span className="card__title">{hotel.Hotel_Name}</span>
						<ul className="DescList">
							{hotel.Hotel_Description.map((desc, i) => (
								<li key={i}>{desc}</li>
							))}
						</ul>
					</Col>
					<div className="card__content">
						<Col>
							<br />

							<div className="aboutDiv">
								<p>{hotel.Hotel_About}</p>
							</div>
						</Col>
						<Col>
							<h2>{`${hotel.Hotel_PricePerNight} TND`}</h2>
							<Button
								className="bookBtn"
								href={hotel.Hotel_Website}
								target="_blank"
							>
								Book
							</Button>
						</Col>
					</div>
				</Row>
			</div>

			<div className="reviewDiv">
				{hotelFound.Hotel_Reviews?.map((review) => (
					<HotelReviewCard review={review} key={review._id} />
				))}
			</div>
			<br />
			<div className="bigPostDiv">
				<div className="postDiv">
					<h2>Post A Review</h2>
					<Rating
						name="Rating"
						value={postReview.Rating}
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
						type="button"
						onClick={() => {
							dispatch(postHotelReview(postReview, hotel._id));
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

export default HotelPage;
