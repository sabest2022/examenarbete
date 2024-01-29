import React, { useEffect } from 'react';
import { useOrderContext } from '../../context/OrderContext';
import './tables.css'

const OrderList = () => {
    const { orders, fetchAllOrders } = useOrderContext();

    useEffect(() => {
        fetchAllOrders();
    }, [fetchAllOrders]);

    if (!orders || orders.length === 0) {
        return <div>No orders available.</div>;
    }

    return (
        <div>
            <h2>Manage Orders</h2>
            <table className="table-bordered">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Total Price</th>
                        <th>Delivered</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => ( // Display only the last 10 orders
                        <tr key={order._id}>
                            <td>{order.orderNumber}</td>
                            <td>{order.customerName}</td> {/* Use customerName directly */}
                            <td>{order.totalprice} kr</td>
                            <td>{order.delivered ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default OrderList;
