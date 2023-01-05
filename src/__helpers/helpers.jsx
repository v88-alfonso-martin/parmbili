export function generateTile(dimension) {
    const array = [];
    for (let i = 0; i < dimension; i++) {
        array.push({
            id: `id${Date.now() + Math.random().toString(16).slice(2)}`,
			crop_planted: "",
			state: "",
			sell_price: 0,
            harvesting_time: 0
		})
    }
    return array
}