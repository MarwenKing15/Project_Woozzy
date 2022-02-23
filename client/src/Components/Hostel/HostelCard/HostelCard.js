import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

// import { useDispatch } from "react-redux";

import "./HostelCard.css";
// import { getHostel } from "../../../JS/actions/hotel";

const HostelCard = ({ hostel }) => {
	// const dispatch = useDispatch();

	return (
		<div>
			<div className="courses-container">
				<div className="course">
					<img
						className="course-preview"
						src={`../../../../${hostel.Hostel_Image}`}
						alt="hostel Img"
					/>
					<div className="course-info">
						<div className="progress-container">
							<Rating
								name="read-only"
								value={hostel.Hostel_Rating}
								readOnly
								precision={0.5}
							/>
						</div>
						<div className="infoDiv">
							<h6>{hostel.Hostel_Location.Country}</h6>
							<h2>{hostel.Hostel_Name}</h2>
						</div>
						<Link
							to={{ pathname: `/hostelInfo/${hostel._id}`, state: hostel }}
							style={{ textDecoration: "none" }}
						>
							<button
								className="Cardbtn"
								// onClick={() => dispatch(getHostel(hostel._id))}
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

export default HostelCard;
