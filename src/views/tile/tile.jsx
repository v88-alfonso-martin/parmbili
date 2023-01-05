import React, { useEffect, useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import CropModal from "../modals/crop_modal/crop_modal";
import RemoveModal from "../modals/remove_modal/remove_modal";
import "./tile.scss";

export default function Tile(props) {
    const [crop_modal_show, setCropModalShow] = useState(false);
    const [remove_modal_show, setRemoveModalShow] = useState(false);
	const {
		tile: { id, state, crop_planted, crop_name, harvesting_time, sell_price },
		tillTile,
        plantCrop,
        removePlant,
        setHarvestingTime,
        harvestCrop,
        setForHarvesting,
        earnings
	} = props;

    useEffect(() => {
        /** Every second, decrease the harvesting time by 1 */
		const timer = (harvesting_time >= 0 && state === "has_plant") && setTimeout(() => setHarvestingTime(id, harvesting_time !== 0 ? harvesting_time - 1 : harvesting_time), 1000);
	    return () => clearTimeout(timer);
	}, [harvesting_time])

	return (
        <>
        	<OverlayTrigger
                trigger="click"
                key="bottom"
                placement="bottom"
                rootClose
                overlay={
                    <Popover>
                        <Popover.Body>
                            {state === "tilled" ? 
                                <button onClick={() => setCropModalShow(true)}>Plant</button> 
                            : state === "has_plant" ?
                                <button className={state === "has_plant" ? "gray_button" : ""} onClick={() => setRemoveModalShow(true)}>Remove</button> 
                            : state === "for_harvesting" ?
                                <div className="buttons_container">
                                    <button onClick={() => harvestCrop(id)}>Harvest</button> 
                                    <button className="gray_button" onClick={() => setRemoveModalShow(true)}>Remove</button> 
                                </div>
                            :
                                <button onClick={() => tillTile(id)}>Till</button>
                            }
                        </Popover.Body>
                    </Popover>
                }
            >
                <div className={`tile ${state}`} onDoubleClick={()=> state === "has_plant" ? setForHarvesting(id) : null}>
                {crop_planted && (<img src={crop_planted} alt={crop_name} />)}
                {state === "has_plant" ? (<p>{harvesting_time}s</p>) : (<p>{sell_price === 0 ? "" : `${sell_price}$`}</p>)}
                </div>
		    </OverlayTrigger>
            <CropModal 
                tile_id={id} 
                plantCrop={plantCrop}
                show={crop_modal_show} 
                onHide={() => setCropModalShow(false)} 
                earnings={earnings}
            />
            <RemoveModal
                tile_id={id}
                show={remove_modal_show}
                onHide={() => setRemoveModalShow(false)}
                removePlant={removePlant}
            />
        </>
	);
}
