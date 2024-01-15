import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const OrderContext = createContext();

export const useOrderContext = () => useContext(OrderContext);

const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [lastOrder, setLastOrder] = useState(null);

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get('/api/orders', { withCredentials: true });
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const fetchOrderById = async (id) => {
        try {
            const response = await axios.get(`/api/orders/${id}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error('Error fetching order:', error);
        }
    };

    const createOrder = async (newOrder) => {
        try {
            const response = await axios.post('/api/orders', newOrder, { withCredentials: true });
            setLastOrder(response.data);
            fetchAllOrders(); // Refresh the list of orders
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const markOrderAsDelivered = async (id) => {
        try {
            await axios.put(`/api/orders/${id}`, { delivered: true }, { withCredentials: true });
            fetchAllOrders(); // Refresh the list of orders
        } catch (error) {
            console.error('Error marking order as delivered:', error);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <OrderContext.Provider value={{
            orders,
            lastOrder,
            createOrder,
            fetchOrderById,
            markOrderAsDelivered
        }}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderProvider;
