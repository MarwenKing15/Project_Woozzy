import React, { useState, useEffect } from "react";
import {
	Form,
	FloatingLabel,
	Button,
	Container,
	Row,
	Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addHotel, editHotel } from "../../../JS/actions/hotel";
import { Link } from "react-router-dom";

const AddEditHotelPage = ({ location, history }) => {
	const hotelF = location.state;
	const dispatch = useDispatch();
	const [hotel, setHotel] = useState({
		Hotel_Name: "",
		Hotel_Description: "",
		Hotel_Location: {
			Street: "",
			City: "",
			Country: "",
		},
		Hotel_Rating: 0,
		Hotel_PricePerNight: "",
		Email: "",
		Hotel_Website: "",
		phoneNumber: "",
		Hotel_About: "",
		Hotel_Image: null,
	});
	const hotelFound = useSelector((state) => state.hotelReducer.hotelFound);
	const load = useSelector((state) => state.hotelReducer.load);
	const errors = useSelector((state) => state.hotelReducer.errors);

	const edit = useSelector((state) => state.hotelReducer.edit);
	useEffect(() => {
		edit
			? load
				? setHotel(hotelF)
				: setHotel(hotelFound)
			: setHotel({
					Hotel_Name: "",
					Hotel_Description: "",
					Hotel_Location: {
						Street: "",
						City: "",
						Country: "",
					},
					Hotel_Rating: 0,
					Hotel_PricePerNight: "",
					Email: "",
					Hotel_Website: "",
					phoneNumber: "",
					Hotel_About: "",
					Hotel_Image: "",
			  });
	}, [edit, hotelFound, load, hotelF]);

	const handleChange = (e) => {
		setHotel({ ...hotel, [e.target.name]: e.target.value });
	};

	// const formData = new FormData();
	// formData.append("hotel", hotel);

	return (
		<div>
			{edit ? <h1>Edit Hotel</h1> : <h1>Add Hotel</h1>}
			{errors &&
				errors.map((error, i) => (
					<h5 style={{ color: "red" }} key={i}>
						{error.msg}
					</h5>
				))}
			<Container>
				<Form>
					<FloatingLabel
						controlId="floatingInput"
						label="Hotel Name"
						className="mb-3"
					>
						<Form.Control
							type="text"
							name="Hotel_Name"
							value={hotel.Hotel_Name}
							onChange={handleChange}
						/>
					</FloatingLabel>

					<FloatingLabel
						controlId="floatingInput"
						label="Hotel Email"
						className="mb-3"
					>
						<Form.Control
							type="email"
							placeholder="name@example.com"
							name="Email"
							value={hotel.Email}
							onChange={handleChange}
						/>
					</FloatingLabel>

					<FloatingLabel
						controlId="floatingInput"
						label="Hotel Website"
						className="mb-3"
					>
						<Form.Control
							type="text"
							name="Hotel_Website"
							value={hotel.Hotel_Website}
							onChange={handleChange}
						/>
					</FloatingLabel>

					<FloatingLabel
						controlId="floatingInput"
						label="Hotel Phone Number"
						className="mb-3"
					>
						<Form.Control
							type="text"
							name="phoneNumber"
							value={hotel.phoneNumber}
							onChange={handleChange}
						/>
					</FloatingLabel>

					<FloatingLabel
						controlId="floatingInput"
						label="Hotel Description"
						className="mb-3"
					>
						<Form.Control
							as="textarea"
							placeholder="Characteristics of the hotel"
							style={{ height: "100px" }}
							name="Hotel_Description"
							value={hotel.Hotel_Description}
							onChange={handleChange}
						/>
					</FloatingLabel>

					<FloatingLabel
						controlId="floatingInput"
						label="Hotel About"
						className="mb-3"
					>
						<Form.Control
							as="textarea"
							placeholder="About The Hotel"
							style={{ height: "100px" }}
							name="Hotel_About"
							value={hotel.Hotel_About}
							onChange={handleChange}
						/>
					</FloatingLabel>
					<Row>
						<Col>
							<FloatingLabel
								controlId="floatingInput"
								label="Hotel Rating"
								className="mb-3"
							>
								<Form.Control
									type="number"
									name="Hotel_Rating"
									value={hotel.Hotel_Rating}
									onChange={handleChange}
								/>
							</FloatingLabel>
						</Col>
						<Col>
							<FloatingLabel
								controlId="floatingInput"
								label="Hotel Price Per Night"
								className="mb-3"
							>
								<Form.Control
									type="number"
									name="Hotel_PricePerNight"
									value={hotel.Hotel_PricePerNight}
									onChange={handleChange}
								/>
							</FloatingLabel>
						</Col>
					</Row>
					<Row>
						<Col>
							<FloatingLabel
								controlId="floatingInput"
								label="Street"
								className="mb-3"
							>
								<Form.Control
									type="text"
									name="Street"
									value={hotel.Hotel_Location.Street}
									onChange={(e) =>
										setHotel({
											...hotel,
											Hotel_Location: {
												...hotel.Hotel_Location,
												Street: e.target.value,
											},
										})
									}
								/>
							</FloatingLabel>
						</Col>
						<Col>
							<FloatingLabel
								controlId="floatingInput"
								label="City"
								className="mb-3"
							>
								<Form.Control
									type="text"
									name="City"
									value={hotel.Hotel_Location.City}
									onChange={(e) =>
										setHotel({
											...hotel,
											Hotel_Location: {
												...hotel.Hotel_Location,
												City: e.target.value,
											},
										})
									}
								/>
							</FloatingLabel>
						</Col>
						<Col>
							<FloatingLabel
								controlId="floatingInput"
								label="Country"
								className="mb-3"
							>
								<Form.Control
									type="text"
									name="Country"
									value={hotel.Hotel_Location.Country}
									onChange={(e) =>
										setHotel({
											...hotel,
											Hotel_Location: {
												...hotel.Hotel_Location,
												Country: e.target.value,
											},
										})
									}
								/>
							</FloatingLabel>
						</Col>
					</Row>
					{!edit && (
						<Form.Group className="mb-3">
							<Form.Label>Hotel Image</Form.Label>
							<Form.Control
								type="file"
								filename="Hotel_Image"
								name="Hotel_Image"
								// value={hotel.Hotel_Image}
								onChange={(e) => {
									setHotel({ ...hotel, Hotel_Image: e.target.files[0] });
									console.log(e.target.files[0]);
								}}
							/>
						</Form.Group>
					)}

					{edit ? (
						<Button
							variant="primary"
							onClick={() => dispatch(editHotel(hotel._id, hotel, history))}
						>
							Edit
						</Button>
					) : (
						<Link to="/manageHotels">
							<Button
								variant="primary"
								// type="submit"
								onClick={() => dispatch(addHotel(hotel))}
							>
								Add
							</Button>
						</Link>
					)}
				</Form>
			</Container>
		</div>
	);
};

export default AddEditHotelPage;
