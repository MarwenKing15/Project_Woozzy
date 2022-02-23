import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUserMinus,
	faArrowAltCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import { deleteUser, upgradeUser } from "../../JS/actions/user";

import defaultProfilePic from "../../assets/403017_avatar_default_head_person_unknown_icon.png";
import "./ManageUsers.css";

const ManageUsers = ({ user }) => {
	const dispatch = useDispatch();

	const [profilePic, setProfilePic] = useState("");

	useEffect(() => {
		if (!user.ProfileImage) {
			setProfilePic(defaultProfilePic);
		} else {
			setProfilePic(`../../../../${user.ProfileImage}`);
		}
	}, [user.ProfileImage]);
	console.log({ id: user._id });

	return (
		<div className="our-team">
			<div className="picture">
				{}
				<img className="img-fluid" src={profilePic} alt="Contact Pic" />
			</div>
			<div className="team-content">
				<h3 className="name">{`${user.First_Name} ${user.Last_Name}`}</h3>
				<h4 className="phoneNumber">{user.role}</h4>
			</div>
			<Container style={{ width: "18rem" }}>
				<Row>
					<Col>
						<button
							className="mngBtn"
							onClick={() => dispatch(upgradeUser(user._id))}
						>
							<FontAwesomeIcon icon={faArrowAltCircleUp} size="2x" />{" "}
						</button>
					</Col>
					<Col>
						<button
							className="mngBtn"
							onClick={() => dispatch(deleteUser(user._id))}
						>
							<FontAwesomeIcon icon={faUserMinus} size="2x" />
						</button>
					</Col>
				</Row>
			</Container>
			<div className="social">
				<h4>{user.Email}</h4>
			</div>
		</div>
	);
};

export default ManageUsers;
