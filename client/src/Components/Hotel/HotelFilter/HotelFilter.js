import React, { useState } from "react";
import { Container, Row, Form } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

import "./HotelFilter.css";

function valuetext(value) {
	return `${value}DT`;
}

const Features = [
	"Breakfast & dinner included ",
	"All-inclusive ",
	"Indoor pool ",
	"Private beach area",
	"Hot tub/Jacuzzi",
	"All meals included",
];
const HotelFilter = () => {
	const [price, setPrice] = useState([20, 37]);
	const [rate, setRate] = useState(1);

	const handleRating = (rate) => {
		setRate(rate);
	};

	const handleChange = (event, newPrice) => {
		setPrice(newPrice);
	};

	return (
		<div>
			<Container>
				<Row>
					<Autocomplete
						freeSolo
						id="free-solo-2-demo"
						disableClearable
						options={Features.map((option) => option.title)}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Search input"
								InputProps={{
									...params.InputProps,
									type: "search",
								}}
							/>
						)}
					/>
				</Row>
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
				<Row>
					<h1>Price</h1>
					<Box sx={{ width: 490 }}>
						<Slider
							getAriaLabel={() => "Price range"}
							value={price}
							onChange={handleChange}
							valueLabelDisplay="auto"
							getAriaValueText={valuetext}
						/>
					</Box>
				</Row>
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

export default HotelFilter;
