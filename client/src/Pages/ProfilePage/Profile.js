import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { editProfile, toogleTrue } from "../../JS/actions/user";
import avatarLogo from "../../assets/403017_avatar_default_head_person_unknown_icon.png";
import "./Profile.css";

const Profile = () => {
	const user = useSelector((state) => state.userReducer.user);
	const [myAddress, setmyAddress] = useState({
		Street: "",
		City: "",
		Country: "",
		ZipCode: "",
	});

	const [userUpdate, setUserUpdate] = useState({
		First_Name: "",
		Last_Name: "",
		Email: "",
		Password: "",
		Username: "",
		Gender: "",
		Address: myAddress,
		ProfileImage: null,
	});

	const handleChange = (e) => {
		setmyAddress({ ...myAddress, [e.target.name]: e.target.value });
		setUserUpdate({ ...userUpdate, [e.target.name]: e.target.value });
	};
	const handleFileSelected = (e) => {
		setUserUpdate({ ...userUpdate, ProfileImage: e.target.files[0].name });
		console.log(e.target.files[0]);
	};
	const errors = useSelector((state) => state.userReducer.errors);
	const edit = useSelector((state) => state.userReducer.edit);

	const dispatch = useDispatch();
	// useEffect(() => {
	// 	dispatch(toogleTrue);
	// }, [dispatch]);

	useEffect(() => {
		dispatch(toogleTrue());
		setUserUpdate({ ...user });
	}, [dispatch, edit, user]);

	const [profilePic, setProfilePic] = useState("");

	useEffect(() => {
		if (!user.ProfileImage) {
			setProfilePic(avatarLogo);
		} else {
			setProfilePic(`../../../../${user.ProfileImage}`);
		}
	}, [user.ProfileImage]);

	return (
		<div>
			<Container>
				<Row>
					<Col>
						<img className="ProfilePic" src={profilePic} alt="profils pic" />
					</Col>
					<Col>
						<h1>User Profile</h1>
						{errors &&
							errors.map((error, i) => (
								<h5 style={{ color: "red" }} key={i}>
									{error.msg}
								</h5>
							))}
						<Form className="form">
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter First Name"
								name="First_Name"
								defaultValue={user.First_Name}
								onChange={handleChange}
							/>
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Last Name"
								name="Last_Name"
								defaultValue={user.Last_Name}
								onChange={handleChange}
							/>
							<Form.Group controlId="formCategory2">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									name="Email"
									defaultValue={user.Email}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="formCategory1">
								<Form.Label>Username</Form.Label>
								<Form.Control
									type="text"
									name="Username"
									defaultValue={user.Username}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter Password"
								name="Password"
								onChange={handleChange}
							/>
							<Form.Label>Gender</Form.Label>
							<Form.Select
								aria-label="Gender"
								name="Gender"
								defaultValue={user.Gender}
								onChange={handleChange}
							>
								<option value="" disabled>
									Gender
								</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Other">Other</option>
							</Form.Select>
							<Form.Group controlId="formCategory4">
								<Form.Label>Profile Image</Form.Label>
								<Form.Control
									type="file"
									name="profileImage"
									onChange={handleFileSelected}
								/>
							</Form.Group>
							<br />
							<Button
								variant="primary"
								onClick={() => dispatch(editProfile(userUpdate))}
							>
								Update Profile
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Profile;
