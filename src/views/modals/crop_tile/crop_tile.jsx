import React from "react";
import "./crop_tile.scss";

export default function CroptTile(props) {
	const {
		crop: { name, img, harvesting_time, buy_price, sell_price },
	} = props;

	return (
		<div className="crop_tile">
			<img src={img} alt={name} />
			<p>{harvesting_time}s / {buy_price}$ / {sell_price}$ </p>
		</div>
	);
}
