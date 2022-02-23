import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Rating from "@mui/material/Rating";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import { getHostel, postHostelReview } from "../../../JS/actions/hostel";
import { getUsers } from "../../../JS/actions/user";
import LoadingPage from "../../LoadingPage/LoadingPage";
import HostelReviewCard from "../../../Components/Hostel/HostelReviewCard/HostelReviewCard";

import "./HostelPage.scss";

const HostelPage = ({ location, match }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUsers());
		dispatch(getHostel(match.params._id));
	}, [dispatch, match.params._id]);
	const load = useSelector((state) => state.hostelReducer.load);

	const hostel = location.state;

	const hostelFound = useSelector((state) => state.hostelReducer.hostelFound);
	const ReviewArr = hostelFound.Hostel_Reviews;
	console.log(ReviewArr);
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
							src={`../../../../${hostel.Hostel_Image}`}
							alt="hotel Img"
						/>
					</Col>
					<Col style={{ textAlign: "left", margin: "90px" }}>
						<br />
						<h6 className="card__location">
							<FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
							{`${hostel.Hostel_Location.Street}
								 ${hostel.Hostel_Location.City}, 
								  ${hostel.Hostel_Location.Country} 
						 `}
						</h6>
						<span className="card__title">{hostel.Hostel_Name}</span>
						<Row>
							<Col>
								<ul className="DescList">
									{hostel.Hostel_Description.map((desc, i) => (
										<li key={i}>{desc}</li>
									))}
								</ul>
							</Col>
							<Col>
								<ul className="DescList">
									{hostel.HostelRoom_Description.map((desc, i) => (
										<li key={i}>{desc}</li>
									))}
								</ul>
							</Col>
						</Row>
					</Col>
					<div className="card__content">
						<Col>
							<div className="aboutDiv">
								<p>{hostel.Hostel_About}</p>
							</div>
						</Col>
						<Col>
							<h2>{`${hostel.Hostel_PricePerNight} TND`}</h2>
							<Button
								className="bookBtn"
								href={hostel.Hostel_Website}
								target="_blank"
							>
								Book
							</Button>
						</Col>
					</div>
				</Row>
			</div>

			<div className="reviewDiv">
				{hostelFound.Hostel_Reviews?.map((review) => (
					<HostelReviewCard review={review} key={review._id} />
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
						onClick={() => {
							dispatch(postHostelReview(postReview, hostel._id));
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

export default HostelPage;
