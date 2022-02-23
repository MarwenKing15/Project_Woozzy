import React, { useState } from "react";
import { Container, Row, Form } from "react-bootstrap";
// import TextField from "@mui/material/TextField";
// import DateRangePicker from "@mui/lab/DateRangePicker";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

import "./HostelFilter.css";

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
	// const [date, setDate] = useState([null, null]);

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
				{/* <Row>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DateRangePicker
							startText="Check-in"
							endText="Check-out"
							value={date}
							onChange={(newDate) => {
								setDate(newDate);
							}}
							renderInput={(startProps, endProps) => (
								<React.Fragment>
									<TextField {...startProps} />
									<Box sx={{ mx: 2 }}> to </Box>
									<TextField {...endProps} />
								</React.Fragment>
							)}
						/>
					</LocalizationProvider>
				</Row> */}
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
