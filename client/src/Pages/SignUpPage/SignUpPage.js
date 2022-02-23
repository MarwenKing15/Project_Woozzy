import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";

import { register } from "../../JS/actions/user";
import "./SignUpPage.css";

const SignUpPage = ({ history }) => {
	const [myAddress, setmyAddress] = useState({
		Street: "",
		City: "",
		Country: "",
		ZipCode: "",
	});

	const [user, setUser] = useState({
		First_Name: "",
		Last_Name: "",
		Email: "",
		Password: "",
		Username: "",
		Gender: "",
		Address: myAddress,
	});

	const errors = useSelector((state) => state.userReducer.errors);
	const dispatch = useDispatch();

	// const handleAddress = (e) => {
	// 	setAddress({ ...user, ...user.Address, [e.target.name]: e.target.value });
	// };
	const handleChange = (e) => {
		setmyAddress({ ...myAddress, [e.target.name]: e.target.value });
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	// {First_Name: ...., Street : "........." }

	return (
		<div className="formContainer">
			<h2 style={{ color: "white" }}>Sign Up</h2>
			{errors &&
				errors.map((error, i) => (
					<h5 style={{ color: "red" }} key={i}>
						{error.msg}
					</h5>
				))}
			<Form>
				<FloatingLabel
					controlId="floatingInput"
					label="First Name"
					className="mb-3"
				>
					<Form.Control
						type="text"
						placeholder="Enter First Name"
						name="First_Name"
						value={user.First_Name}
						onChange={handleChange}
					/>
				</FloatingLabel>
				<br />
				<FloatingLabel
					controlId="floatingInput"
					label="Last Name"
					className="mb-3"
				>
					<Form.Control
						type="text"
						placeholder="Enter Last Name"
						name="Last_Name"
						value={user.Last_Name}
						onChange={handleChange}
					/>
				</FloatingLabel>
				<br />
				<FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
					<Form.Control
						type="email"
						placeholder="Enter Email"
						name="Email"
						value={user.Email}
						onChange={handleChange}
					/>
				</FloatingLabel>
				<br />
				<FloatingLabel
					controlId="floatingInput"
					label="Username"
					className="mb-3"
				>
					<Form.Control
						type="text"
						placeholder="Enter Your Username"
						name="Username"
						value={user.Username}
						onChange={handleChange}
					/>
				</FloatingLabel>
				<br />
				<FloatingLabel
					controlId="floatingInput"
					label="Password"
					className="mb-3"
				>
					<Form.Control
						type="password"
						placeholder="Enter Password"
						name="Password"
						value={user.Password}
						onChange={handleChange}
					/>
				</FloatingLabel>
				<br />

				<Form.Select
					aria-label="Gender"
					name="Gender"
					value={user.Gender}
					onChange={handleChange}
				>
					<option value="" disabled>
						Gender
					</option>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
					<option value="Other">Other</option>
				</Form.Select>
				<br />
				<h4 style={{ color: "white" }}>Address</h4>
				<Form>
					<Row>
						<Col>
							<FloatingLabel
								controlId="floatingInput"
								label="Street"
								className="mb-3"
							>
								<Form.Control
									type="text"
									placeholder="Enter Your Street"
									name="Street"
									value={user.Address.Street}
									onChange={(e) =>
										setUser({
											...user,
											Address: { ...user.Address, Street: e.target.value },
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
									placeholder="Enter Your City"
									name="City"
									value={user.Address.City}
									onChange={(e) =>
										setUser({
											...user,
											Address: { ...user.Address, City: e.target.value },
										})
									}
								/>
							</FloatingLabel>
						</Col>
					</Row>
					<br />
					<Row>
						<Col>
							<FloatingLabel
								controlId="floatingInput"
								label="Country"
								className="mb-3"
							>
								<Form.Control
									type="text"
									placeholder="Enter Your Country"
									name="Country"
									value={user.Address.Country}
									onChange={(e) =>
										setUser({
											...user,
											Address: { ...user.Address, Country: e.target.value },
										})
									}
								/>
							</FloatingLabel>
						</Col>
						<Col>
							<FloatingLabel
								controlId="floatingInput"
								label="ZipCode"
								className="mb-3"
							>
								<Form.Control
									type="number"
									placeholder="Enter Your ZipCode"
									name="ZipCode"
									value={user.Address.ZipCode}
									onChange={(e) =>
										setUser({
											...user,
											Address: { ...user.Address, ZipCode: e.target.value },
										})
									}
								/>
							</FloatingLabel>
						</Col>
					</Row>
				</Form>
			</Form>

			<Button
				className="addBtn"
				onClick={() => dispatch(register(user, history))}
			>
				Sign Up
			</Button>
		</div>
	);
};

export default SignUpPage;
