import axios from "axios";
import { useEffect, useState } from "react";

export default function CityStats() {
    const [orders, setOrders] = useState([]);
    const [topCities, setTopCities] = useState([]);

    useEffect(() => {
        axios.get('/api/orders').then(response => {
            setOrders(response.data);
        });
    }, []);

    const calculateCityCounts = () => {
        const cityCounts = {};

        orders.forEach(order => {
            const city = order.city;

            if (city) {
                if (cityCounts[city]) {
                    cityCounts[city]++;
                } else {
                    cityCounts[city] = 1;
                }
            }
        });


        // Convert cityCounts object to array of { city, count } objects
        const countsArray = Object.entries(cityCounts).map(([city, count]) => ({ city, count }));

        // Sort the array by count in descending order
        countsArray.sort((a, b) => b.count - a.count);

        // Set the top 3 cities or all cities if there are fewer than 3
        setTopCities(countsArray.slice(0, 3));

        return countsArray;
    };

    useEffect(() => {
        calculateCityCounts();
    }, [orders,]);

    return (
        <div className="h-[30vh]  w-full lg:w-[25rem] flex flex-col items-center lg:justify-start lg:text-left text-center justify-center">
            <h4 className=" black_text font-medium uppercase text-left">Top 3 orașe după numărul de comenzi</h4>
            <div className="text-center lg:text-left flex items-center lg:items-start justify-center gap-5">
                {topCities.map(({ city, count }) => (
                    <div key={city}>
                        <h5 className="grey_text">Oraș: {city}</h5>
                        <h5 className="grey_text ">Număr comenzi: {count}</h5>
                    </div>
                ))}
            </div>
        </div>
    );
}
