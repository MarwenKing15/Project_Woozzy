import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

import { useDispatch } from "react-redux";

import "./HotelCard.css";
import { getHotel } from "../../../JS/actions/hotel";

const HotelCard = ({ hotel }) => {
	const dispatch = useDispatch();

	return (
		<div>
			<div className="courses-container">
				<div className="course">
					<img
						className="course-preview"
						src={`../../../../${hotel.Hotel_Image}`}
						alt="hotel Img"
					/>
					<div className="course-info">
						<div className="progress-container">
							<Rating
								name="read-only"
								value={hotel.Hotel_Rating}
								readOnly
								precision={0.5}
							/>
						</div>
						<div className="infoDiv">
							<h6>{hotel.Hotel_Location.Country}</h6>
							<h2>{hotel.Hotel_Name}</h2>
						</div>
						<Link
							to={{ pathname: `/hotelInfo/${hotel._id}`, state: hotel }}
							style={{ textDecoration: "none" }}
						>
							<button
								className="Cardbtn"
								onClick={() => dispatch(getHotel(hotel._id))}
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

export default HotelCard;
