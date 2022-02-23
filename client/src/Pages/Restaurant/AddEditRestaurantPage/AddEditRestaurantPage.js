import React, { useEffect, useState } from "react";
import {
	Form,
	FloatingLabel,
	Button,
	Container,
	Row,
	Col,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addRestaurant } from "../../../JS/actions/restaurant";

const AddEditRestaurantPage = ({ location, match }) => {
	const edit = useSelector((state) => state.restaurantReducer.edit);
	const restaurantF = location.state;
	const dispatch = useDispatch();
	const [restaurant, setRestaurant] = useState({
		Restaurant_Name: " ",
		Restaurant_Description: [],
		Restaurant_Cuisines: [],

		Restaurant_Location: {
			Street: " ",
			City: " ",
			Country: " ",
		},
		Restaurant_Rating: 0,
		Restaurant_Email: " ",
		Restaurant_Website: " ",
		Restaurant_phoneNumber: " ",
		Restaurant_Image: null,
	});
	const restaurantFound = useSelector(
		(state) => state.restaurantReducer.restaurantFound
	);
	const load = useSelector((state) => state.restaurantReducer.load);
	const errors = useSelector((state) => state.restaurantReducer.errors);

	useEffect(() => {
		// dispatch(getRestaurant(match.params._id));
		edit
			? load
				? setRestaurant(restaurantF)
				: setRestaurant(restaurantFound)
			: setRestaurant({
					Restaurant_Name: " ",
					Restaurant_Description: [],
					Restaurant_Cuisines: [],

					Restaurant_Location: {
						Street: " ",
						City: " ",
						Country: " ",
					},
					Restaurant_Rating: 0,
					Restaurant_Email: " ",
					Restaurant_Website: " ",
					Restaurant_phoneNumber: " ",
					Restaurant_Image: null,
			  });
	}, [edit, restaurantFound, load, restaurantF]);

	const handleChange = (e) => {
		setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
	};

	return (
		<div>
			{edit ? <h1>Edit Restaurant</h1> : <h1>Add Restaurant</h1>}

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
						label="Restaurant Name"
						className="mb-3"
					>
						<Form.Control
							type="text"
							name="Restaurant_Name"
							value={restaurant.Restaurant_Name}
							onChange={handleChange}
						/>
					</FloatingLabel>

					<FloatingLabel
						controlId="floatingInput"
						label="Restaurant Email"
						className="mb-3"
					>
						<Form.Control
							type="email"
							placeholder="name@example.com"
							name="Restaurant_Email"
							value={restaurant.Restaurant_Email}
							onChange={handleChange}
						/>
					</FloatingLabel>

					<FloatingLabel
						controlId="floatingInput"
						label="Restaurant Website"
						className="mb-3"
					>
						<Form.Control
							type="text"
							name="Restaurant_Website"
							value={restaurant.Restaurant_Website}
							onChange={handleChange}
						/>
					</FloatingLabel>

					<FloatingLabel
						controlId="floatingInput"
						label="Restaurant Phone Number"
						className="mb-3"
					>
						<Form.Control
							type="text"
							name="Restaurant_phoneNumber"
							value={restaurant.Restaurant_phoneNumber}
							onChange={handleChange}
						/>
					</FloatingLabel>

					<FloatingLabel
						controlId="floatingInput"
						label="Restaurant Description"
						className="mb-3"
					>
						<Form.Control
							as="textarea"
							placeholder="Characteristics of the Restaurant"
							style={{ height: "100px" }}
							name="Restaurant_Description"
							value={restaurant.Restaurant_Description}
							onChange={handleChange}
						/>
					</FloatingLabel>

					<FloatingLabel
						controlId="floatingInput"
						label="Restaurant Cuisines"
						className="mb-3"
					>
						<Form.Control
							as="textarea"
							placeholder="Characteristics of the Restaurant"
							style={{ height: "100px" }}
							name="Restaurant_Cuisines"
							value={restaurant.Restaurant_Cuisines}
							onChange={handleChange}
						/>
					</FloatingLabel>

					<FloatingLabel
						controlId="floatingInput"
						label="Restaurant Rating"
						className="mb-3"
					>
						<Form.Control
							type="number"
							name="Restaurant_Rating"
							value={restaurant.Restaurant_Rating}
							onChange={handleChange}
						/>
					</FloatingLabel>
					<Row>
						<Col>
							<FloatingLabel
								controlId="floatingInput"
								label="Street"
								className="mb-3"
							>
								<Form.Control
									type="text"
									value={restaurant.Restaurant_Location.Street}
									name="Street"
									onChange={(e) =>
										setRestaurant({
											...restaurant,
											Restaurant_Location: {
												...restaurant.Restaurant_Location,
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
									value={restaurant.Restaurant_Location.City}
									name="City"
									onChange={(e) =>
										setRestaurant({
											...restaurant,
											Restaurant_Location: {
												...restaurant.Restaurant_Location,
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
									value={restaurant.Restaurant_Location.Country}
									name="Country"
									onChange={(e) =>
										setRestaurant({
											...restaurant,
											Restaurant_Location: {
												...restaurant.Restaurant_Location,
												Country: e.target.value,
											},
										})
									}
								/>
							</FloatingLabel>
						</Col>
					</Row>

					<Form.Group controlId="formFile" className="mb-3">
						<Form.Label>Restaurant Image</Form.Label>
						<Form.Control type="file" />
					</Form.Group>

					{edit ? (
						<Button variant="primary" type="submit">
							Edit
						</Button>
					) : (
						<Button
							variant="primary"
							onClick={() => dispatch(addRestaurant(restaurant))}
						>
							Add
						</Button>
					)}
				</Form>
			</Container>
		</div>
	);
};

export default AddEditRestaurantPage;
