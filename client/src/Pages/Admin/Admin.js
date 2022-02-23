import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUsers } from "../../JS/actions/user";
import { getHotels } from "../../JS/actions/hotel";
import { getHostels } from "../../JS/actions/hostel";
import { getRestaurants } from "../../JS/actions/restaurant";

import {
	faUtensils,
	faUsers,
	faHotel,
	faBed,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import "./Admin.css";
import { Link } from "react-router-dom";

const Admin = () => {
	const user = useSelector((state) => state.userReducer.user);
	const listUser = useSelector((state) => state.userReducer.listUser);
	const listHotels = useSelector((state) => state.hotelReducer.listHotels);
	const listHostels = useSelector((state) => state.hostelReducer.listHostels);
	const listRestaurants = useSelector(
		(state) => state.restaurantReducer.listRestaurants
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsers());
		dispatch(getHotels());
		dispatch(getHostels());
		dispatch(getRestaurants());
	}, [dispatch]);

	return (
		<div>
			<h2>{`Hello Mr ${user.First_Name}`}</h2>
			<Container>
				<Col>
					<Row>
						<Col>
							<Link to="/manageUsers" style={{ textDecoration: "none" }}>
								<div className="card card-tale">
									<Row>
										<Col sm={4}>
											<div className="iconDiv">
												<FontAwesomeIcon icon={faUsers} size="6x" />
											</div>
										</Col>
										<Col sm={8}>
											<div className="card-body">
												<p className="mb-4">Manage Users</p>
												<p className="fs-30 mb-2">{`Number of Users : ${listUser.length}`}</p>
											</div>
										</Col>
									</Row>
								</div>
							</Link>
						</Col>
						<Col>
							<Link to="/manageHotels" style={{ textDecoration: "none" }}>
								<div className="card card-dark-blue">
									<Row>
										<Col sm={4}>
											<div className="iconDiv">
												<FontAwesomeIcon icon={faHotel} size="6x" />
											</div>
										</Col>
										<Col sm={8}>
											<div className="card-body">
												<p className="mb-4">Manage Hotels</p>
												<p className="fs-30 mb-2">{`Number of Hotels : ${listHotels.length}`}</p>
											</div>
										</Col>
									</Row>
								</div>
							</Link>
						</Col>
					</Row>
					<br />
					<Row>
						<Col>
							<Link to="/manageHostels" style={{ textDecoration: "none" }}>
								<div className="card card-light-blue">
									<Row>
										<Col sm={4}>
											<div className="iconDiv">
												<FontAwesomeIcon icon={faBed} size="6x" />
											</div>
										</Col>
										<Col sm={8}>
											<div className="card-body">
												<p className="mb-4">Manage Hostels</p>
												<p className="fs-30 mb-2">{`Number of Hostels : ${listHostels.length}`}</p>
											</div>
										</Col>
									</Row>
								</div>
							</Link>
						</Col>
						<Col>
							<Link to="/manageRestaurants" style={{ textDecoration: "none" }}>
								<div className="card card-light-danger">
									<Row>
										<Col sm={4}>
											<div className="iconDiv">
												<FontAwesomeIcon icon={faUtensils} size="6x" />
											</div>
										</Col>
										<Col sm={8}>
											<div className="card-body">
												<p className="mb-4">Manage Restaurants</p>
												<p className="fs-30 mb-2">
													{`Number of Restaurants : ${listRestaurants.length}`}
												</p>
											</div>
										</Col>
									</Row>
								</div>
							</Link>
						</Col>
					</Row>
				</Col>
			</Container>
		</div>
	);
};

export default Admin;
