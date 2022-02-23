import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

import avatarLogo from "../../../assets/403017_avatar_default_head_person_unknown_icon.png";

const RestaurantReviewCard = ({ review }) => {
	const dispatch = useDispatch();
	const listUser = useSelector((state) => state.userReducer.listUser);
	const [user, setUser] = useState({});
	useEffect(() => {
		for (let i = 0; i < listUser.length; i++) {
			if (review.User === listUser[i]._id) {
				setUser(listUser[i]);
			}
		}
	}, [dispatch, review.User, listUser]);

	const [profilePic, setProfilePic] = useState("");

	useEffect(() => {
		if (!user.ProfileImage) {
			setProfilePic(avatarLogo);
		} else {
			setProfilePic(`../../../../${user.ProfileImage}`);
		}
	}, [dispatch, user.ProfileImage, review.User]);

	return (
		<Card sx={{ width: "250px" }} style={{ margin: "10px" }}>
			<CardHeader
				avatar={
					<Avatar
						aria-label="recipe"
						src={profilePic}
						style={{ textAlign: "left" }}
					/>
				}
				title={`${user.First_Name} ${user.Last_Name}`}
				// subheader={review.addDate}
			/>
			<CardContent>
				<Rating
					name="read-only"
					value={review.Rating}
					precision={0.5}
					readOnly
				/>
				<Typography variant="body2" color="text.secondary">
					{review.Review}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default RestaurantReviewCard;
