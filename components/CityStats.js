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

        console.log('City Counts:', cityCounts);

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
        <div>
            <h4 className="dark_blue_text bold">Top 3 Cities with Most Orders</h4>
            <div>
                {topCities.map(({ city, count }) => (
                    <div key={city}>
                        <h5 className="grey_text">City: {city}</h5>
                        <h5 className="grey_text">Order Count: {count}</h5>
                    </div>
                ))}
            </div>
        </div>
    );
}