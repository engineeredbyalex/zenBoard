import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/common/Spinner";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    axios.get('/api/products').then(response => {
      setProducts(response.data);
    });
  }, []);

  const getProductDetails = (productId) => {
    const product = products.find(product => product._id === productId);
    return product || {};
  };

  return (
    <Layout>
      <div className="flex text-center items-center justify-center">
        <h3 className="uppercase grey_text">Orders</h3>
      </div>
      <div className="mb-10 flex items-center justify-center flex-col">
        <h4 className="uppercase grey_text font-light">Stripe</h4>
        <div className="flex flex-col lg:flex-row items-start gap-5">
          <button className="bg-black p-2 rounded-lg text-white w-[15rem]">
            <Link target="_blank" href={'https://dashboard.stripe.com/payments'}>See Stripe Orders</Link>
          </button>
          <button className="bg-black p-2 rounded-lg text-white w-[15rem]">
            <Link href={'https://dashboard.stripe.com/balance/overview'}>See Stripe Balance</Link>
          </button>
          <button className="bg-black p-2 rounded-lg text-white w-[15rem]">
            <Link href={'https://dashboard.stripe.com/customers'}>See Stripe Clients</Link>
          </button>
        </div>
      </div>
      <table >
        <thead>
          <tr>
            <th>Date</th>
            <th>Payment Status</th>
            <th>Client</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4}>
                <div className="py-4">
                  <Spinner fullWidth={true} />
                </div>
              </td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <tr key={order._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                  {order.paid ? 'Yes' : 'No'}
                </td>
                <td>
                  <p>Name : {order.name} </p>
                  <p>Email Adress: {order.email} </p>
                  <p>Phone Number : {order.phone}</p>
                  <p>City : {order.city}</p>
                  <p>Postal Code : {order.postalCode}</p>
                  <p>County : {order.country} </p>
                  <p>Adress : {order.streetAddress} </p>
                </td>
                <td>
                  {order.line_items.map((lineItem, index) => {
                    const productDetails = getProductDetails(lineItem.productId);
                    return (
                      <div key={index} className="border border-black p-2 mb-2">
                        <p>Product Name: {productDetails.title}</p>
                        <p>Quantity : {lineItem.quantity}</p>
                        {lineItem.selectedValues && lineItem.selectedValues.length > 0 ? (
                          lineItem.selectedValues.map((selectedValue, index) => (
                            <p key={index}>
                              Option {index + 1}: {selectedValue.value}
                            </p>
                          ))
                        ) : (
                          <p>No selected values</p>
                        )}
                      </div>
                    );
                  })}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Layout>
  );
}
