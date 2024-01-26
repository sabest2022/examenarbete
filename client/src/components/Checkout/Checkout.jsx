import React, { useContext, useState } from "react";
import { useOrderContext } from "../../context/OrderContext";
import { CartContext } from "../../context/CartContext";
import CartList from "../CartList/CartList";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { createOrder } = useOrderContext();
    const { cartItems, clearCart } = useContext(CartContext); // Assuming you have a CartContext
    const { currentUser } = useUserContext();
    const navigate = useNavigate();
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = async () => {
        try {
            if (cartItems.length === 0) {
                // Optionally handle the case where the cart is empty
                return;
            }

            const customerId = currentUser._id;
            const customerName = currentUser.name;
            const customerEmail = currentUser.email;
            const stripeCustomerId = currentUser.stripeCustomerId;

            const orderItems = cartItems.map((item) => ({
                plan: item.plan._id,
                title: item.plan.title,
                price: item.plan.price,
            }));

            const totalPrice = orderItems.reduce((total, item) => total + item.price, 0);

            const newOrder = {
                customer: customerId,
                customerName: customerName,
                customerEmail: customerEmail,
                stripeCustomerId: stripeCustomerId,
                orderItems: orderItems,
                totalprice: totalPrice,
                date: new Date(),
                address: {
                    street: "", // Add your customer address properties here
                    zipcode: "",
                    city: "",
                    country: "",
                },
                delivered: false,
            };

            const stripeUrl = await createOrder(newOrder);
            if (stripeUrl) {
                window.location.href = stripeUrl;
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    const handleGoBack = () => {
        navigate('/'); // Adjust the navigation route as needed
    };

    return (
        <div>
            {!orderPlaced && (
                <button onClick={handlePlaceOrder} disabled={cartItems.length === 0}>
                    Place Order
                </button>
            )}

            {orderPlaced && (
                <div>
                    <p>Your order has been placed!</p>
                    <button onClick={handleGoBack}>Go Back to First Page</button>
                </div>
            )}

            {!orderPlaced && <CartList />}
        </div>
    );
};

export default Checkout;
