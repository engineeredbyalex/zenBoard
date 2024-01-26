import axios from "axios";
import { useEffect, useState } from "react";

export default function TopSalesStats() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/orders').then(response => {
            setOrders(response.data);
        });

        axios.get('/api/products').then(result => {
            setProducts(result.data);
        });
    }, []);

    const calculateProductCounts = () => {
        const productCounts = {};

        orders.forEach(order => {
            order.line_items.forEach(item => {
                const productId = item.productId;

                if (productId) {
                    if (productCounts[productId]) {
                        productCounts[productId]++;
                    } else {
                        productCounts[productId] = 1;
                    }
                }
            });
        });



        // Convert productCounts object to array of { productId, count } objects
        const countsArray = Object.entries(productCounts).map(([productId, count]) => ({ productId, count }));

        // Sort the array by count in descending order
        countsArray.sort((a, b) => b.count - a.count);

        // Set the top 3 products or all products if there are fewer than 3
        setTopProducts(countsArray.slice(0, 3));

        return countsArray;
    };

    useEffect(() => {
        calculateProductCounts();
    }, [orders, products, calculateCityCounts]);

    return (
        <div className="h-[30vh] w-full lg:w-[25rem] flex flex-col items-center lg:justify-start lg:text-left text-center justify-center ">
            <h4 className=" black_text  font-medium uppercase">Top 3 cele mai vândute produse</h4>
            <div className="text-center lg:text-left flex items-center lg:items-start justify-center gap-5">
                {topProducts.map(({ productId, count }) => {
                    const product = products.find(product => product._id === productId);
                    return (
                        <div key={productId}>
                            <h5 className="grey_text">Nume: {product ? product.title : 'Unknown'}</h5>
                            <h5 className="grey_text">Cantitate: {count}</h5>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}
