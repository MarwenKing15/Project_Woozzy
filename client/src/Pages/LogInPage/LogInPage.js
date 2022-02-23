import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Form, Button, FloatingLabel } from "react-bootstrap";

import { login } from "../../JS/actions/user";
// import LogInImg from "../../assets/LogInImg.jpg";

import "./LogInPage.css";

const LogInPage = ({ history }) => {
	const [user, setUser] = useState({ Email: "", Password: "" });
	const errors = useSelector((state) => state.userReducer.errors);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<div className="allDiv">
			<div className="cont">
				<div className="LogInImg">
					{/* <img className="LogInImg" src={LogInImg} alt="backImg" /> */}
				</div>
				<div>
					{errors &&
						errors.map((error, i) => (
							<h5 style={{ color: "red" }} key={i}>
								{error.msg}
							</h5>
						))}
					<h2>Welcome Back</h2>

					<h4>Log In</h4>

					<Form>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<FloatingLabel
								controlId="floatingInput"
								label="Email address"
								className="mb-3"
							>
								<Form.Control
									type="email"
									placeholder="Enter email"
									name="Email"
									value={user.Email}
									onChange={handleChange}
								/>
							</FloatingLabel>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<FloatingLabel controlId="floatingPassword" label="Password">
								<Form.Control
									type="password"
									placeholder="Password"
									name="Password"
									value={user.Password}
									onChange={handleChange}
								/>
							</FloatingLabel>
						</Form.Group>
						<br />
						<Button
							variant="primary"
							onClick={() => {
								dispatch(login(user, history));
							}}
						>
							Log In
						</Button>
					</Form>

					<h5>
						You don't have an accoun?{" "}
						<span>
							<Link to="/register" className="signUpLink">
								Sign Up
							</Link>
						</span>
					</h5>
				</div>
			</div>
		</div>
	);
};

export default LogInPage;
