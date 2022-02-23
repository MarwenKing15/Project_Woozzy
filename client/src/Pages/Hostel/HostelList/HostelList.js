import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HostelCard from "../../../Components/Hostel/HostelCard/HostelCard";
// import HostelFilter from "../../../Components/Hostel/HostelFilter/HostelFilter";
import { Col, Row, Form } from "react-bootstrap";
import "./HostelList.css";
import { getHostels } from "../../../JS/actions/hostel";
import LoadingPage from "../../LoadingPage/LoadingPage";

const HostelList = () => {
	const listHostels = useSelector((state) => state.hostelReducer.listHostels);
	const load = useSelector((state) => state.hostelReducer.load);
	const dispatch = useDispatch();
	const [country, setCountry] = useState("");

	useEffect(() => {
		dispatch(getHostels());
	}, [dispatch]);
	return load ? (
		<LoadingPage />
	) : (
		<div>
			<Row>
				<Col>
					<h1>Country</h1>

					<br />
					<Form.Select
						aria-label="Country"
						name="Country"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					>
						<option value="" disabled>
							Country
						</option>
						{listHostels.map((hostel, i) => (
							<option value={hostel.Hostel_Location.Country} key={i}>
								{hostel.Hostel_Location.Country}
							</option>
						))}
					</Form.Select>
					{/* </Row> */}
				</Col>
				<Col sm={8}>
					{country
						? listHostels
								.filter((hostel) => hostel.Hostel_Location.Country === country)
								.map((hostel) => (
									<HostelCard hostel={hostel} key={hostel._id} />
								))
						: listHostels.map((hostel) => (
								<HostelCard hostel={hostel} key={hostel._id} />
						  ))}
				</Col>
			</Row>
		</div>
	);
};

export default HostelList;
