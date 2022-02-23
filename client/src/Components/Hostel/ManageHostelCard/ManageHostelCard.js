import React from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare, faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import {
	deleteHostel,
	getHostel,
	toogleTrue,
} from "../../../JS/actions/hostel";
import "./ManageHostelCard.css";

const ManageCard = ({ hostel }) => {
	const dispatch = useDispatch();

	return (
		<div>
			<div className="wrapper">
				<h1>{hostel.Hostel_Location.Country}</h1>
				<img
					className="image"
					src={`../../../../${hostel.Hostel_Image}`}
					alt="pic"
				/>
				<div className="details">
					<h1>
						<em>{hostel.Hostel_Email}</em>
					</h1>
					<h2>{hostel.Hostel_Name}</h2>
					<p> {hostel.Hostel_phoneNumber}</p>
				</div>
				<div>
					<Container style={{ width: "18rem" }}>
						<Row>
							<Col>
								<Link
									to={{ pathname: `/editHostel/${hostel._id}`, state: hostel }}
								>
									<button
										className="mngBtn"
										onClick={() => {
											dispatch(toogleTrue());
											dispatch(getHostel(hostel._id));
										}}
									>
										<FontAwesomeIcon
											icon={faPenSquare}
											size="3x"
											color="black"
										/>
									</button>
								</Link>
							</Col>
							<Col>
								<button
									className="mngBtn"
									onClick={() => dispatch(deleteHostel(hostel._id))}
								>
									<FontAwesomeIcon icon={faMinusSquare} size="3x" />
								</button>
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		</div>
	);
};

export default ManageCard;
