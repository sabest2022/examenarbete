import React from 'react';

const OrderList = () => {
    // Placeholder orders array
    const orders = [
        { id: 1, status: 'Shipped' },
        { id: 2, status: 'Processing' }
        // Add more orders here
    ];

    return (
        <div>
            <h2>Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        Order #{order.id} - Status: {order.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;
