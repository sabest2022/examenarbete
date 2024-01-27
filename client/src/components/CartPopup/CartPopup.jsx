import "./CartPopup.css";
import { useContext } from "react";
import { ImCross } from "react-icons/im";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useUserContext } from "../../context/UserContext";// Make sure this path is correct

const CartPopup = ({ closeCartPopup }) => {
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
    const { isSignedIn } = useUserContext();

    const totalPrice = cartItems.reduce((total, item) => {
        const itemPrice = item.plan.price * item.quantity;
        return total + (itemPrice || 0);
    }, 0);
    const handleCheckout = () => {
        if (!isSignedIn) {
            // Prompt user to sign in
            alert("Please sign in to proceed to checkout.");
            return;
        }
        closeCartPopup();
        // Proceed with navigation to checkout page
    };

    return (
        <div className="CartPopup__container">
            <div className="cart-item-header">
                <h1>Cart</h1>
                <ImCross onClick={closeCartPopup} />
            </div>
            <div className="cart-items-container">
                {cartItems.length > 0 ? cartItems.map((item) => (
                    <div key={item.plan._id} className="cart-item-card">

                        <div className="cart-item-details-wrapper">
                            <div className="cart-item-info">
                                <h1>{item.plan.title}</h1>
                                <p>{item.plan.price} kr</p>
                            </div>
                            <div className="cart-item-btns">

                                <button onClick={() => removeFromCart(item.plan)}>Remove from cart</button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="empty-cart">
                        <MdRemoveShoppingCart />
                        <p>Your cart is empty.</p>
                    </div>
                )}
            </div>
            <div className="cart-item-footer">
                <p>Total price: {totalPrice} kr</p>
                <div className="cart-item-footer-btns">
                    {isSignedIn ? (
                        <Link to={"/checkout"}>
                            <button onClick={handleCheckout} disabled={cartItems.length ===
                                0}>Checkout</button>
                        </Link>
                    ) : (
                        <button onClick={handleCheckout}>Sign in to Checkout</button>
                    )}
                    <button onClick={clearCart}>Clear cart</button>

                </div>
            </div>
        </div>
    );
};

export default CartPopup;