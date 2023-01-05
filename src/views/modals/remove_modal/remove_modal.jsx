import React from "react";
import Modal from "react-bootstrap/Modal";
import "./remove_modal.scss";

export default function RemoveModal(props) {
	const { tile_id, removePlant, ...rest } = props;

	return (
		<Modal
			className="remove_modal"
			{...rest}
			size="sm"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Body>
				<form
					method="post"
					onSubmit={event => {
						event.preventDefault();
						removePlant(tile_id);
						rest.onHide();
					}}
				>
					<h5>Remove Plant</h5>
					<p>Are you sure you want to remove this plant?</p>
					<button
						type="button"
						className="cancel_button"
						onClick={rest.onHide}
					>
						Cancel
					</button>
					<button
						type="submit"
						className="success_button"
					>
						Remove
					</button>
				</form>
			</Modal.Body>
		</Modal>
	);
}
