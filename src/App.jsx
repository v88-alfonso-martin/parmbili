import React, { useState } from "react";
import Tile from "./views/tile/tile";
import "./App.scss";
import { generateTile } from "./__helpers/helpers";

function App() {
	const [tiles, setTiles] = useState(generateTile(16));
	const [earnings, setEarnings] = useState(50);

	/** 
	*   DOCU: Till the selected tile.
	*   Triggered by src/views/tile/tile.jsx
	*   Last updated at: January 5, 2023
	*   @param {string} tile_id id of the selected tile.
	*   @author Alfonso Martin Angeles
	*/
	function tillTile(tile_id) {
		setTiles(prev_state =>
			prev_state.map(tile => {
				if (tile.id === tile_id) {
					return { ...tile, state: "tilled" };
				}

				return tile;
			})
		);
	}

	/** 
	*   DOCU: Plant the crop in the selected tile.
	*   Triggered by src/views/modals/crop_modal/crop_modal.jsx
	*   Last updated at: January 5, 2023
	*   @param {string} tile_id id of the selected tile.
	*   @param {object} crop crop that will be planted.
	*   @param {string} img image of the crop that will be planted.
	*   @param {number} buy_price price of the crop to be planted.
	*   @param {number} sell_price price of the crop if harvested.
	*   @param {number} harvesting_time time left to harvest the crop.
	*   @author Alfonso Martin Angeles
	*/
	function plantCrop(tile_id, {img, buy_price, sell_price, harvesting_time }) {
		setTiles(prev_state =>
			prev_state.map(tile => {
				if (tile.id === tile_id) {
					return {
						...tile,
						crop_planted: img,
						sell_price,
						state: "has_plant",
						harvesting_time,
					};
				}

				return tile;
			})
		);

		setEarnings(prev_state => prev_state - buy_price);
	}

	/** 
	*   DOCU: Remove the plant in the selected tile.
	*   Triggered by src/views/modals/remove_modal/remove_modal.jsx
	*   Last updated at: January 5, 2023
	*   @param {string} tile_id id of the selected tile.
	*   @author Alfonso Martin Angeles
	*/
	function removePlant(tile_id) {
		setTiles(prev_state =>
			prev_state.map(tile => {
				if (tile.id === tile_id) {
					return {
						...tile,
						crop_planted: "",
						sell_price: 0,
						state: "",
						harvesting_time: 0,
					};
				}

				return tile;
			})
		);
	}

	/** 
	*   DOCU: Decrease the time left to harvest the crop.
	*   Triggered by src/views/tile/tile.jsx
	*   Last updated at: January 5, 2023
	*   @param {string} tile_id id of the selected tile.
	*   @param {number} harvesting_time time left to harvest the crop.
	*   @author Alfonso Martin Angeles
	*/
	function setHarvestingTime(tile_id, harvesting_time) {
		setTiles(prev_state =>
			prev_state.map(tile => {
				if (tile.id === tile_id) {
					return {
						...tile,
						state: tile.harvesting_time === 0 && tile.crop_planted ? "for_harvesting" : tile.state,
						harvesting_time
					};
				}

				return tile;
			})
		);
	}

	/** 
	*   DOCU: Get the crop ready for harvesting when double clicked.
	*   Triggered by src/views/tile/tile.jsx
	*   Last updated at: January 5, 2023
	*   @param {string} tile_id id of the selected tile.
	*   @author Alfonso Martin Angeles
	*/
	function setForHarvesting(tile_id) {
		setTiles(prev_state =>
			prev_state.map(tile => {
				if (tile.id === tile_id) {
					return {
						...tile,
						state: "for_harvesting",
						harvesting_time: 0,
					};
				}

				return tile;
			})
		);
	}

	/** 
	*   DOCU: Harvest the crop and make the tile empty state again.
	*   Triggered by src/views/tile/tile.jsx
	*   Last updated at: January 5, 2023
	*   @param {string} tile_id id of the selected tile.
	*   @author Alfonso Martin Angeles
	*/
	function harvestCrop(tile_id) {
		let earnings = 0;
		setTiles(prev_state =>
			prev_state.map(tile => {
				if (tile.id === tile_id) {
					earnings = tile.sell_price;
					return {
						...tile,
						crop_planted: "",
						sell_price: 0,
						state: "",
						harvesting_time: 0,
					};
				}

				return tile;
			})
		);
		setEarnings(prev_state => (prev_state += earnings));
	}

	/** 
	*   DOCU: Expand the tiles.
	*   Triggered by src/App.jsx
	*   Last updated at: January 5, 2023
	*   @param {number} dimension number of tiles to be added.
	*   @param {number} expand_price price of expanding the tiles.
	*   @author Alfonso Martin Angeles
	*/
	function expandTiles(dimension, expand_price) {
		setTiles(prev_state => [...prev_state, ...generateTile(dimension)]);
		setEarnings(prev_state => prev_state - expand_price);
	}

	let tile_size = tiles.length === 16 ? "four" : tiles.length === 25 ? "five" : tiles.length === 36 ? "six" : tiles.length === 49 ? "seven" : tiles.length === 64 ? "eight" : "";

	return (
		<div className="app_container">
			<header>
				<h2>Parmbili</h2>
			</header>
			<main>
				<div
					className={`tiles_container ${tile_size}`}
				>
					<div className="tiles">
						{tiles.map(tile => (
							<Tile
								key={tile.id}
								tile={tile}
								tillTile={tillTile}
								plantCrop={plantCrop}
								removePlant={removePlant}
								setHarvestingTime={setHarvestingTime}
								harvestCrop={harvestCrop}
								setForHarvesting={setForHarvesting}
								earnings={earnings}
							/>
						))}
					</div>
					<p>Total Earnings: {earnings}$</p>
					{tiles.length === 16 ? (
						<button
							className={earnings < 180 ? "disabled" : ""}
							disabled={earnings < 180}
							onClick={() => expandTiles(9, 180)}
						>
							Expand land to 5 x 5 180$
						</button>
					) : tiles.length === 25 ? (
						<button
							className={earnings < 270 ? "disabled" : ""}
							disabled={earnings < 270}
							onClick={() => expandTiles(11, 270)}
						>
							Expand land to 6 x 6 270$
						</button>
					) : tiles.length === 36 ? (
						<button
							className={earnings < 360 ? "disabled" : ""}
							disabled={earnings < 360}
							onClick={() => expandTiles(13, 360)}
						>
							Expand land to 7 x 7 360$
						</button>
					) : tiles.length === 49 ? (
						<button
							className={earnings < 450 ? "disabled" : ""}
							disabled={earnings < 450}
							onClick={() => expandTiles(15, 450)}
						>
							Expand land to 8 x 8 450$
						</button>
					) : null}
				</div>
			</main>
		</div>
	);
}

export default App;
