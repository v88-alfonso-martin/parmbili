import potato from "../assets/img/potato.png";
import onion from "../assets/img/onion.png";
import carrot from "../assets/img/carrot.png";
import corn from "../assets/img/corn.png";

export const CROPS = [
    {
        name: "potato",
        img: potato,
        harvesting_time: 20,
        buy_price: 10,
        sell_price: 15
    },
    {
        name: "onion",
        img: onion,
        harvesting_time: 30,
        buy_price: 15,
        sell_price: 25
    },
    {
        name: "carrot",
        img: carrot,
        harvesting_time: 45,
        buy_price: 25,
        sell_price: 75
    },
    {
        name: "corn",
        img: corn,
        harvesting_time: 60,
        buy_price: 35,
        sell_price: 100
    }
]