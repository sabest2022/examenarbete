import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrderContext } from "../../context/OrderContext";
import { CartContext } from "../../context/CartContext";
import CartList from "../CartList/CartList";


const Checkout = () => {
    const { createOrder } = useOrderContext();
    const { cartItems, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [customerAddress, setCustomerAddress] = useState({
        street: "",
        zipcode: "",
        city: "",
        country: ""
    });

    const isCustomerAddressValid = () => {
        // Implement validation logic for customer address
        // Example: return customerAddress.street !== "" && customerAddress.zipcode !== "";
    };

    const handlePlaceOrder = async () => {
        // Implementation for placing the order
    };

    const renderCheckoutStep = () => {
        switch (currentIndex) {
            case 0:
                return <CartList />; // Implement or import CartList component
            case 1:
                return <CustomerInfoForm
                    address={customerAddress}
                    setAddress={setCustomerAddress}
                />; // Implement or import CustomerInfoForm component
            case 2:
                return
                <DeliveryOptions
                // Props as needed for delivery options
                />; // Implement or import DeliveryOptions component
            default:
                return <div>Unknown step</div>;
        }
    };

    const renderNavigationButtons = () => {
        return (
            <>
                {currentIndex > 0 && (
                    <button onClick={() => setCurrentIndex(currentIndex - 1)}>
                        Previous
                    </button>
                )}
                {currentIndex < 2 && (
                    <button
                        onClick={() => setCurrentIndex(currentIndex + 1)}
                        disabled={!isCustomerAddressValid()}
                    >
                        Nexten
                    </button>,
                    <button onClick={handlePlaceOrder} disabled={!isCustomerAddressValid()}>
                        Place Order
                    </button>
                )}
                {currentIndex === 2 && (
                    <button onClick={handlePlaceOrder} disabled={!isCustomerAddressValid()}>
                        Place Order
                    </button>
                )}
            </>
        );
    };

    return (
        <div className="checkout__container">
            {renderCheckoutStep()}
            {renderNavigationButtons()}
        </div>
    );
};

export default Checkout;

// // import Loader from "./Loader/Loader";

// const Checkout = () => {

//     const callNextComponent = () => {
//         setCurrentIndex(currentIndex + 1);
//     };

//     const callPreviousComponent = () => {
//         setCurrentIndex(currentIndex - 1);
//     };

//     const isCustomerAddressValid = () => {
//         // Implement validation logic for customer address
//         return /* true or false based on validation */;
//     };

//     const renderBtn = () => {
//         switch (currentIndex) {
//             case 0:
//                 return <button onClick={callNextComponent} disabled={cartItems.length === 0}>Next</button>;
//             case 1:
//                 return (
//                     <>
//                         <button onClick={callNextComponent} disabled={!user || !isCustomerAddressValid()}>Next</button>
//                         <button onClick={callPreviousComponent}>Previous</button>
//                     </>
//                 );
//             case 2:
//                 return (
//                     <>
//                         <button onClick={handlePlaceOrder} disabled={!selectedDelivery || cartItems.length === 0 || !isCustomerAddressValid()}>Place Order</button>

//                         <button onClick={callPreviousComponent}>Previous</button>
//                     </>
//                 );
//             default:
//                 return null;
//         }
//     };

//     const { createOrder } = useOrderContext();
//     const { cartItems, clearCart } = useContext(CartContext);
//     const navigate = useNavigate();

//     const [isLoading, setIsLoading] = useState(false);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [orderComponent, setOrderComponent] = useState(<CartList />);
//     const [selectedDelivery, setSelectedDelivery] = useState(undefined);
//     const [customerAddress, setCustomerAddress] = useState({
//         street: "",
//         zipcode: "",
//         city: "",
//         country: ""
//     });


//     const handlePlaceOrder = async () => {
//         setIsLoading(true);
//         try {
//             // Assuming `user` is the state where the current user's info is stored
//             const customerId = '65a0fecbd21fe005d65dcecc';

//             // Assuming `cartItems` is your cart state
//             const orderItems = cartItems.map((item) => ({
//                 plan: item.plan._id,
//                 price: item.plan.price
//             }));

//             // Calculate total price
//             const totalPrice = orderItems.reduce((total, item) => total + item.price, 0);
//             // Construct the order object
//             const newOrder = {
//                 customer: customerId,
//                 orderItems: orderItems,
//                 totalprice: totalPrice,
//                 date: new Date(),
//                 address: customerAddress,
//                 delivered: false
//             };

//             const order = await createOrder(newOrder);
//             if (order) {
//                 clearCart();
//                 navigate('/confirmation');
//             }
//         } catch (error) {
//             console.error('Error placing order:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     if (currentIndex === 1) {
//         return (
//             <>
//                 {/* <button onClick={() => setCurrentIndex(2)} disabled={!isCustomerInfoValid()}>Next</button> */}
//                 <button onClick={() => setCurrentIndex(0)}>Previous</button>
//             </>
//         );
//     }
//     if (currentIndex === 2) {
//         return (
//             <>
//                 {/* <button onClick={handlePlaceOrder} disabled={!isShippingInfoValid()}>Place Order</button> */}
//                 <button onClick={() => setCurrentIndex(1)}>Previous</button>
//             </>
//         );
//     }

//     return (
//         <div className="checkout__container">
//             {/* Checkout JSX */}
//             {renderBtn()}
//         </div>
//     );
// };

// export default Checkout;

