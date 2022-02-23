import React, { useEffect } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Woozzy_Logo from "../../assets/Logo_Navbar.png";
import { getHostels } from "../../JS/actions/hostel";
import { getHotels } from "../../JS/actions/hotel";
import { getRestaurants } from "../../JS/actions/restaurant";
import LoadingPage from "../LoadingPage/LoadingPage";
import "./LandingPage.scss";

const LandingPage = () => {
	const dispatch = useDispatch();
	const load = useSelector((state) => state.hotelReducer.load);
	const listHostels = useSelector((state) => state.hostelReducer.listHostels);
	const listHotels = useSelector((state) => state.hotelReducer.listHotels);
	const listRestaurants = useSelector(
		(state) => state.restaurantReducer.listRestaurants
	);

	useEffect(() => {
		dispatch(getHostels());
		dispatch(getHotels());
		dispatch(getRestaurants());
	}, [dispatch]);

	return load ? (
		<LoadingPage />
	) : (
		<div>
			<div className="Carr">
				<Container>
					<Row>
						<Col sm={8}>
							<div className="animated-title">
								<div className="text-top">
									<div>
										<span>Welcome</span>
									</div>
								</div>
								<div className="text-bottom">
									<div>
										to
										<img
											src={Woozzy_Logo}
											alt="Woozzy Logo"
											style={{ width: "350px", marginTop: "-10px" }}
										/>
									</div>
								</div>
							</div>
						</Col>
						<Col sm={4}>
							<div>
								<h4 className="wordCarousel">
									<span>Find the best </span>
									<div>
										<ul className="flip4">
											<li>Restaurants</li>
											<li>Hostels</li>
											<li>Hotels</li>
											<li>and live the best experience</li>
										</ul>
									</div>
									{/* <span>and live the best experience</span> */}
								</h4>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			<Row style={{ margin: "10px" }}>
				<Col>
					<h2>Best Rated Hostels</h2>
					<Carousel fade indicators={false}>
						{listHostels
							.filter((hostel) => hostel.Hostel_Rating >= 4.5)
							.map((hostel) => (
								<Carousel.Item key={hostel._id}>
									<img
										className="d-block w-100 carImg"
										src={hostel.Hostel_Image}
										alt="Hostels"
									/>
									<Carousel.Caption>
										<h3 style={{ color: "white" }}>{hostel.Hostel_Name}</h3>
									</Carousel.Caption>
								</Carousel.Item>
							))}
					</Carousel>
				</Col>
				<Col>
					<h2>Best Rated Hotels</h2>
					<Carousel fade indicators={false}>
						{listHotels
							.filter((hotel) => hotel.Hotel_Rating >= 4.5)
							.map((hotel) => (
								<Carousel.Item key={hotel._id}>
									<img
										className="d-block w-100 carImg"
										src={hotel.Hotel_Image}
										alt="Hotels"
									/>
									<Carousel.Caption>
										<h3 style={{ color: "white" }}>{hotel.Hotel_Name}</h3>
									</Carousel.Caption>
								</Carousel.Item>
							))}
					</Carousel>
				</Col>
				<Col>
					<h2>Best Rated Restaurants</h2>
					<Carousel fade indicators={false}>
						{listRestaurants
							.filter((restaurant) => restaurant.Restaurant_Rating >= 4.5)
							.map((restaurant) => (
								<Carousel.Item key={restaurant._id}>
									<img
										className="d-block w-100 carImg"
										src={restaurant.Restaurant_Image}
										alt="Restaurants"
									/>
									<Carousel.Caption>
										<h3 style={{ color: "white" }}>
											{restaurant.Restaurant_Name}
										</h3>
									</Carousel.Caption>
								</Carousel.Item>
							))}
					</Carousel>
				</Col>
			</Row>
		</div>
	);
};

export default LandingPage;
