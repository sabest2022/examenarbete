import { useContext } from "react";
import { useOrderContext } from "../../context/OrderContext";
import { CartContext } from "../../context/CartContext";
import CartList from "../CartList/CartList";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import './Checkout.css'

const Checkout = () => {
    const { createOrder } = useOrderContext();
    const { cartItems } = useContext(CartContext); // Assuming you have a CartContext
    const { currentUser } = useUserContext();
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/'); // Change to your desired route
        // Or, if not using React Router:
        // window.location.href = "your-first-page-url";
    };
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

    return (
        <div className="checkout-container">
            <CartList />
            {cartItems.length > 0 ? (
                <button className="place-order-btn" onClick={handlePlaceOrder}>
                    Place Order
                </button>
            ) : (
                <button className="back-btn" onClick={handleBackClick}>
                    Back to Home
                </button>
            )}
        </div>
    );
};

export default Checkout;
