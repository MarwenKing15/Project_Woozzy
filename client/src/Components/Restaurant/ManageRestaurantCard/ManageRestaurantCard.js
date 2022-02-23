import React from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare, faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import {
	deleteRestaurant,
	getRestaurant,
	toogleTrue,
} from "../../../JS/actions/restaurant";
import "./ManageRestaurantCard.css";

const ManageCard = ({ restaurant }) => {
	const dispatch = useDispatch();

	return (
		<div>
			<div className="wrapper">
				<h1>{restaurant.Restaurant_Location.Country}</h1>
				<img
					className="image"
					src={`../../../../${restaurant.Restaurant_Image}`}
					alt="pic"
				/>
				<div className="details">
					<h1>
						<em>{restaurant.Restaurant_Email}</em>
					</h1>
					<h2>{restaurant.Restaurant_Name}</h2>
					<p> {restaurant.Restaurant_phoneNumber}</p>
				</div>
				<div>
					<Container style={{ width: "18rem" }}>
						<Row>
							<Col>
								<Link
									to={{
										pathname: `/editRestaurant/${restaurant._id}`,
										state: restaurant,
									}}
								>
									<button
										className="mngBtn"
										onClick={() => {
											dispatch(toogleTrue());
											dispatch(getRestaurant(restaurant._id));
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
									onClick={() => dispatch(deleteRestaurant(restaurant._id))}
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
