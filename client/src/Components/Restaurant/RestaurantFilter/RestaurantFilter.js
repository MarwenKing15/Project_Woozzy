import React, { useState } from "react";
import { Container, Row, Form } from "react-bootstrap";

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

import "./RestaurantFilter.css";

const Features = [
	"Breakfast & dinner included ",
	"All-inclusive ",
	"Indoor pool ",
	"Private beach area",
	"Hot tub/Jacuzzi",
	"All meals included",
];
const RestaurantFilter = () => {
	const [rate, setRate] = useState(1);

	const handleRating = (rate) => {
		setRate(rate);
	};

	return (
		<div>
			<Container>
				<Row>
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
				<Row></Row>
				<Row>
					<div className="featuresDiv">
						<h1>Features</h1>
						{Features.map((feature, i) => (
							<Form.Check
								key={i}
								type="checkbox"
								id={`default-checkbox`}
								label={`${feature}`}
							/>
						))}
					</div>
				</Row>
			</Container>
		</div>
	);
};

export default RestaurantFilter;
