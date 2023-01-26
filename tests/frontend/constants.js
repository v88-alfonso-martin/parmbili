const CONSTANT = {
    timeout: 200000,
    sleep: 1000,
    assert_timeout: 30000,
    tile: 25
}

const CROP = {
    potato: "label:nth-child(1) img",
    onion:  "label:nth-child(2) img",
    carrot: "label:nth-child(3) img",
    corn: "label:nth-child(4) img"
    
}

const HARVESTING_TIME ={
    corn: 70000,
    potato: 30000
}

module.exports = {CONSTANT, CROP, HARVESTING_TIME}