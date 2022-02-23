import React from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare, faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { deleteHotel, getHotel, toogleTrue } from "../../../JS/actions/hotel";
import "./ManageHotelCard.css";

const ManageHotelCard = ({ hotel }) => {
	const dispatch = useDispatch();

	return (
		<div>
			<div className="wrapper">
				<h2>{hotel.Hotel_Location.Country}</h2>
				<img
					className="image"
					src={`../../../../${hotel.Hotel_Image}`}
					alt="pic"
				/>
				<div className="details">
					<h1>
						<em>{hotel.Email}</em>
					</h1>
					<h2>{hotel.Hotel_Name}</h2>
					<p> {hotel.phoneNumber}</p>
				</div>
				<div>
					<Container style={{ width: "18rem" }}>
						<Row>
							<Col>
								<Link
									// to={`/editHotel/${hotel._id}`}
									to={{ pathname: `/editHotel/${hotel._id}`, state: hotel }}
								>
									<button
										className="mngBtn"
										onClick={() => {
											dispatch(toogleTrue());
											dispatch(getHotel(hotel._id));
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
									onClick={() => dispatch(deleteHotel(hotel._id))}
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

export default ManageHotelCard;
