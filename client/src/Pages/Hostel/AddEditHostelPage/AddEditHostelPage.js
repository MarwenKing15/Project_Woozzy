import React, { useState, useEffect } from "react";
import {
	Form,
	FloatingLabel,
	Button,
	Container,
	Row,
	Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addHostel } from "../../../JS/actions/hostel";

const AddEditHostelPage = ({ match, location }) => {
	const edit = useSelector((state) => state.hostelReducer.edit);
	const hostelFound = useSelector((state) => state.hostelReducer.hostelFound);
	const load = useSelector((state) => state.hostelReducer.load);
	const errors = useSelector((state) => state.hostelReducer.errors);
	const hostelF = location.state;

	const [hostel, setHostel] = useState({
		Hostel_Name: "",
		Hostel_Description: "",
		HostelRoom_Description: "",
		Hostel_Location: {
			Street: "",
			City: "",
			Country: "",
		},
		Hostel_Rating: "",
		Hostel_PricePerNight: "",
		Hostel_Email: "",
		Hostel_Website: "",
		Hostel_phoneNumber: "",
		Hostel_About: "",
		// Hostel_Image: null,
	});

	const dispatch = useDispatch();

	useEffect(() => {
		edit
			? load
				? setHostel(hostelF)
				: setHostel(hostelFound)
			: setHostel({
					Hostel_Name: "",
					Hostel_Description: "",
					HostelRoom_Description: "",
					Hostel_Location: {
						Street: "",
						City: "",
						Country: "",
					},
					Hostel_Rating: "",
					Hostel_PricePerNight: "",
					Hostel_Email: "",
					Hostel_Website: "",
					Hostel_phoneNumber: "",
					Hostel_About: "",
					// Hostel_Image: null,
			  });
	}, [edit, hostelF, hostelFound, load]);

	const handleChange = (e) => {
		setHostel({ ...hostel, [e.target.name]: e.target.value });
	};
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
						label="Hostel Name"
						className="mb-3"
					>
						<Form.Control
							type="text"
							name="Hostel_Name"
							value={hostel.Hostel_Name}
							onChange={handleChange}
						/>
					</FloatingLabel>

					<FloatingLabel
						controlId="floatingInput"
						label="Hostel Email"
						className="mb-3"
					>
						<Form.Control
							type="email"
							placeholder="name@example.com"
							name="Hostel_Email"
							value={hostel.Hostel_Email}
							onChange={handleChange}
						/>
					</FloatingLabel>

					<FloatingLabel
						controlId="floatingInput"
						label="Hostel Website"
						className="mb-3"
					>
						<Form.Control
							type="text"
							name="Hostel_Website"
							value={hostel.Hostel_Website}
							onChange={handleChange}
						/>
					</FloatingLabel>

					<FloatingLabel
						controlId="floatingInput"
						label="Hostel Phone Number"
						className="mb-3"
					>
						<Form.Control
							type="text"
							name="Hostel_phoneNumber"
							value={hostel.Hostel_phoneNumber}
							onChange={handleChange}
						/>
					</FloatingLabel>

					<FloatingLabel
						controlId="floatingInput"
						label="Hostel Description"
						className="mb-3"
					>
						<Form.Control
							as="textarea"
							placeholder="Characteristics of the hostel"
							style={{ height: "100px" }}
							name="Hostel_Description"
							value={hostel.Hostel_Description}
							onChange={handleChange}
						/>
					</FloatingLabel>

					<FloatingLabel
						controlId="floatingInput"
						label="Hostel Room Description"
						className="mb-3"
					>
						<Form.Control
							as="textarea"
							placeholder="Characteristics of the hostel room"
							style={{ height: "100px" }}
							name="HostelRoom_Description"
							value={hostel.HostelRoom_Description}
							onChange={handleChange}
						/>
					</FloatingLabel>

					<FloatingLabel
						controlId="floatingInput"
						label="Hostel About"
						className="mb-3"
					>
						<Form.Control
							as="textarea"
							placeholder="About The Hostel"
							style={{ height: "100px" }}
							name="Hostel_About"
							value={hostel.Hostel_About}
							onChange={handleChange}
						/>
					</FloatingLabel>
					<Row>
						<Col>
							<FloatingLabel
								controlId="floatingInput"
								label="Hostel Rating"
								className="mb-3"
							>
								<Form.Control
									type="number"
									name="Hostel_Rating"
									value={hostel.Hostel_Rating}
									onChange={handleChange}
								/>
							</FloatingLabel>
						</Col>
						<Col>
							<FloatingLabel
								controlId="floatingInput"
								label="Hostel Price Per Night"
								className="mb-3"
							>
								<Form.Control
									type="number"
									name="Hostel_PricePerNight"
									value={hostel.Hostel_PricePerNight}
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
									value={hostel.Hostel_Location.Street}
									onChange={(e) =>
										setHostel({
											...hostel,
											Hostel_Location: {
												...hostel.Hostel_Location,
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
									value={hostel.Hostel_Location.City}
									onChange={(e) =>
										setHostel({
											...hostel,
											Hostel_Location: {
												...hostel.Hostel_Location,
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
									value={hostel.Hostel_Location.Country}
									onChange={(e) =>
										setHostel({
											...hostel,
											Hostel_Location: {
												...hostel.Hostel_Location,
												Country: e.target.value,
											},
										})
									}
								/>
							</FloatingLabel>
						</Col>
					</Row>

					{/* <Form.Group className="mb-3">
						<Form.Label>Hostel Image</Form.Label>
						<Form.Control
							type="file"
							name="Hostel_Image"
							// value={hostel.Hostel_Image}
							onChange={(e) =>
								setHostel({ ...hostel, Hostel_Image: e.target.files[0] })
							}
						/>
					</Form.Group> */}

					{edit ? (
						<Button variant="primary">Edit</Button>
					) : (
						<Link to="/manageHostels">
							<Button
								variant="primary"
								// type="submit"
								onClick={() => dispatch(addHostel(hostel))}
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

export default AddEditHostelPage;
