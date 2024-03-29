import axios from "axios";
import { useEffect, useState } from "react";

export default function Stats() {
    const [orders, setOrders] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryCounts, setCategoryCounts] = useState([]);

    useEffect(() => {
        axios.get('/api/orders').then(response => {
            setOrders(response.data);
        });

        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    }, []);

    const calculateCategoryCounts = () => {
        const counts = {};

        orders.forEach(order => {
            order.line_items.forEach(item => {
                const categoryId = item.category;

                if (categoryId) {
                    if (counts[categoryId]) {
                        counts[categoryId]++;
                    } else {
                        counts[categoryId] = 1;
                    }
                }
            });
        });

        // Convert counts object to array of { categoryId, count } objects
        const countsArray = Object.entries(counts).map(([categoryId, count]) => ({ categoryId, count }));

        // Sort the array by count in descending order
        countsArray.sort((a, b) => b.count - a.count);

        // Set the top 3 categories or all categories if there are fewer than 3
        setCategoryCounts(countsArray.slice(0, 3));

        return counts;
    };

    useEffect(() => {
        calculateCategoryCounts();
    }, [orders, categories, calculateCategoryCounts]);

    return (
        <div className="h-auto  w-full lg:w-[25rem] flex flex-col items-center lg:justify-start lg:text-left text-center justify-center">
            <h4 className="black_text font-medium uppercase">Categorii</h4>
            <div className="text-center lg:text-left flex items-center lg:items-start justify-center gap-5">
                {categoryCounts.map(({ categoryId, count }) => {
                    const category = categories.find(category => category._id === categoryId);
                    return (
                        <div key={categoryId}>
                            <p className="grey_text">Nume: {category ? category.name : 'Unknown'}</p>
                            <p className="grey_text">Cantitate: {count}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
