import "./CartPopup.css";
import { useContext } from "react";
import { ImCross } from "react-icons/im";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext"; // Make sure this path is correct

const CartPopup = ({ closeCartPopup }) => {
    const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);
    console.log(cartItems);
    const totalPrice = cartItems.reduce((total, item) => {
        const itemPrice = item.plan.price * item.quantity;
        return total + (itemPrice || 0);
    }, 0);

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
                    <Link to={"/checkout"}>
                        <button onClick={closeCartPopup} disabled={cartItems.length ===
                            0}>Checkout</button>
                    </Link>
                    <button onClick={clearCart}>Clear cart</button>
                </div>
            </div>
        </div>
    );
};

export default CartPopup;