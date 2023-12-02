import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import StatsBox from "../Boxes/StatsBox";
import Grid from "../Layout/Grid";
import { subHours } from "date-fns";
import CategoryStats from "../Stats/CategoryStats";
import TopSalesStats from "../Stats/TopSalesStats";
import CityStats from "../Stats/CityStats";


function HomeStatsNew() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        axios.get("/api/orders").then((res) => {
            setOrders(res.data);
        });

        axios.get("/api/products").then((res) => {
            setProducts(res.data);
        });
    }, []);



    function getProductPrice(productId) {
        const product = products.find((p) => p._id === productId);
        return product ? product.price : 0;
    }

    function revenueTotal(order) {
        let sum = 0;
        for (const itemId in order.line_items) {
            const item = order.line_items[itemId];
            const productId = item.productId;
            const quantity = item.quantity;
            const productPrice = getProductPrice(productId);
            sum += quantity * productPrice;
        }
        return sum;
    }

    function totalOrdersRevenue() {
        let totalRevenue = 0;
        orders.forEach((order) => {
            totalRevenue += revenueTotal(order);
        });
        return totalRevenue;
    }
    function percentageIncreaseThisMonth() {
        const currentDate = new Date();
        const ordersThisMonth = orders.filter((o) => new Date(o.createdAt) > subHours(currentDate, 24 * 30));
        const totalRevenueThisMonth = ordersThisMonth.reduce((sum, order) => sum + revenueTotal(order), 0);
        const previousMonthRevenue = orders.filter((o) => new Date(o.createdAt) > subHours(currentDate, 24 * 60)).reduce((sum, order) => sum + revenueTotal(order), 0);
        const percentageIncrease = ((totalRevenueThisMonth - previousMonthRevenue) / previousMonthRevenue) * 100;
        return percentageIncrease.toFixed(2); // Return the percentage increase rounded to 2 decimal places
    }
    function percentageIncreaseThisWeek() {
        const ordersThisWeek = orders.filter((o) => new Date(o.createdAt) > subHours(new Date(), 24 * 7));
        const totalRevenueThisWeek = ordersThisWeek.reduce((sum, order) => sum + revenueTotal(order), 0);
        const previousWeekRevenue = orders.filter((o) => new Date(o.createdAt) > subHours(new Date(), 24 * 14)).reduce((sum, order) => sum + revenueTotal(order), 0);
        const percentageIncrease = ((totalRevenueThisWeek - previousWeekRevenue) / previousWeekRevenue) * 100;
        return percentageIncrease.toFixed(2); // Return the percentage increase rounded to 2 decimal places
    }
    function totalOrder() {
        let totalOrder = 0
        orders.forEach((order) => {
            totalOrder++
        })
        return totalOrder
    }
    function ordersThisMonth() {
        const currentDate = new Date();
        return orders.filter(
            (o) => new Date(o.createdAt) > subHours(currentDate, 24 * 30)
        );
    }

    function ordersThisWeek() {
        const currentDate = new Date();
        return orders.filter(
            (o) => new Date(o.createdAt) > subHours(currentDate, 24 * 7)
        );
    }
    return (
        <div className="flex flex-col gap-5 mt-10 ">
            <Grid>
                <StatsBox
                    background='#252525'
                    text="black_text"
                    title="Vânzări totale"
                    value={totalOrdersRevenue()}
                    percent_value={percentageIncreaseThisMonth()}
                    value_week={percentageIncreaseThisWeek()} />
                <StatsBox
                    background='#fff'
                    text="black_text"
                    title="Comenzi totale"
                    value={totalOrder()}
                    percent_value={ordersThisMonth().length}
                    value_week={ordersThisWeek().length}
                />
            </Grid>
            <Grid className="mt-10">
                <CategoryStats />
                <TopSalesStats />
                <CityStats />
            </Grid>
        </div>
    );
}

export default HomeStatsNew;
