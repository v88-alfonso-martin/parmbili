import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./crop_modal.scss";
import { CROPS } from "../../../__config/constant";
import CroptTile from "../crop_tile/crop_tile";

export default function CropModal(props) {
	const [crops] = useState(CROPS);
	const [selected_crop, setSelectedCrop] = useState("");
	const { tile_id, plantCrop, earnings, ...rest} = props;

	return (
		<Modal
			className="crop_modal"
			{...rest}
			size="sm"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body>
				<h5>Select a Crop to Plant</h5>
				<form method="post" onSubmit={(event) => {
					event.preventDefault();
					plantCrop(tile_id, CROPS.find((crop) => crop.name === selected_crop));
					setSelectedCrop("");
					rest.onHide();
				}}>
					<div className="crops_container">
						{crops.map(crop => (
							<label key={crop.name}>
								<input type="radio" name="crop" defaultValue={crop.name} onChange={(event) => setSelectedCrop(event.target.value) }/>
								<CroptTile crop={crop} />
							</label>
						))}
					</div>
					<button
						type="button"
						className="cancel_button"
						onClick={rest.onHide}
					>
						Cancel
					</button>
					<button type="submit" className={`success_button ${selected_crop && crops.find((crop) => crop.name === selected_crop)?.buy_price <= earnings ? "" : "disabled"}`} disabled={!(selected_crop && crops.find((crop) => crop.name === selected_crop)?.buy_price <= earnings)}>
						Plant
					</button>
				</form>
			</Modal.Body>
		</Modal>
	);
}
