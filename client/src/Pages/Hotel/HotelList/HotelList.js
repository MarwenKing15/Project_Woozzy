import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HotelCard from "../../../Components/Hotel/HotelCard/HotelCard";
// import HotelFilter from "../../../Components/Hotel/HotelFilter/HotelFilter";
// import { Col, Row } from "react-bootstrap";
import "./HotelList.css";
import { getHotels } from "../../../JS/actions/hotel";
import LoadingPage from "../../LoadingPage/LoadingPage";
import { Container, Col, Row, Form } from "react-bootstrap";
// import Box from "@mui/material/Box";
// import Slider from "@mui/material/Slider";
// import Rating from "@mui/material/Rating";
// import Stack from "@mui/material/Stack";
// import { Slider, InputNumber } from "antd";

// function valuetext(value) {
// 	return `${value}DT`;
// }

// const Features = [
// 	"Breakfast & dinner included ",
// 	"All-inclusive ",
// 	"Indoor pool ",
// 	"Private beach area",
// 	"Hot tub/Jacuzzi",
// 	"All meals included",
// ];

const HotelList = () => {
	const listHotels = useSelector((state) => state.hotelReducer.listHotels);
	const load = useSelector((state) => state.hotelReducer.load);
	const dispatch = useDispatch();

	// const [minPrice, setMinPrice] = useState(100);
	// const [maxPrice, setMaxPrice] = useState(900);
	// const [rate, setRate] = useState(1);
	const [country, setCountry] = useState("");

	// const handleRating = (rate) => {
	// 	setRate(rate);
	// };

	// const handleChange = (event, newPrice) => {
	// 	setPrice(newPrice);
	// };

	useEffect(() => {
		dispatch(getHotels());
	}, [dispatch]);
	return load ? (
		<LoadingPage />
	) : (
		<div>
			<Row>
				<Col sm={4}>
					<Container>
						<Row>
							<h1>Country</h1>

							<br />
							<Form.Select
								aria-label="Country"
								name="Country"
								value={country}
								onChange={(e) => setCountry(e.target.value)}
							>
								<option value="" disabled>
									Country
								</option>
								{listHotels.map((hotel, i) => (
									<option value={hotel.Hotel_Location.Country} key={i}>
										{hotel.Hotel_Location.Country}
									</option>
								))}
							</Form.Select>
						</Row>
						{/* <Row>
							<h1>Rating</h1>
							<div className="ratingDiv">
								<Stack spacing={1}>
									<Rating
										name="half-rating"
										defaultValue={1}
										precision={0.5}
										onClick={handleRating}
										rate={rate}
									/>
								</Stack>
							</div>
						</Row>
						<Row> */}
						{/* <h1>Price</h1> */}

						{/* <Row>
								<Col>
									<h5>Min Price:</h5>
									<InputNumber
										min={50}
										max={1000}
										style={{ margin: "0 16px" }}
										value={minPrice}
										onChange={(e) => setMinPrice(e.target.value)}
									/>
								</Col>

								<Col>
									<h5>Max Price:</h5>
									<InputNumber
										min={50}
										max={1000}
										style={{ margin: "0 16px" }}
										value={maxPrice}
										onChange={(e) => setMaxPrice(e.target.value)}
									/>
								</Col>
							</Row> */}
						{/* </Row> */}
						<Row>
							{/* <div className="featuresDiv">
								<h1>Features</h1>
								{listHotels.map((hotel, i) => (
									<Form.Check
										key={i}
										type="checkbox"
										id={`default-checkbox`}
										label={`${hotel.Hotel_Description}`}
									/>
								))}
								{/* {Features.map((feature, i) => (
									<Form.Check
										key={i}
										type="checkbox"
										id={`default-checkbox`}
										label={`${feature}`}
									/>
								))} 
							</div> */}
						</Row>
					</Container>
				</Col>
				<Col sm={8}>
					{/* {listHotels
						.filter((hotel) => hotel.Hotel_Rating === rate)
						.map((hotel) => (
							<HotelCard hotel={hotel} key={hotel._id} />
						))} */}
					{country
						? listHotels
								.filter((hotel) => hotel.Hotel_Location.Country === country)
								.map((hotel) => <HotelCard hotel={hotel} key={hotel._id} />)
						: listHotels.map((hotel) => (
								<HotelCard hotel={hotel} key={hotel._id} />
						  ))}
				</Col>
			</Row>
		</div>
	);
};

export default HotelList;
