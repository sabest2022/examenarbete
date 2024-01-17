import { useContext } from "react";
import "./CartList.css";
import { CartContext } from "../../context/CartContext";

const CartList = () => {
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

    const totalPrice = cartItems.reduce((total, item) => {
        const itemPrice = item.plan.price * item.quantity;
        return total + itemPrice;
    }, 0);

    if (cartItems.length <= 0) {
        return <div className="empty">
            <p>Your cart is empty</p>
        </div>;
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Plan</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((cartItem) => (
                        <tr key={cartItem.plan._id}>
                            <td className="product_data">

                                <p>{cartItem.plan.title}</p>
                            </td>
                            <td>
                                <p>{cartItem.plan.price} kr</p>
                            </td>

                            <td className="product_action">
                                {/* <button onClick={() => addToCart(cartItem.plan._id)}>Add More</button> */}
                                <button onClick={() => removeFromCart(cartItem.plan)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="summary">
                <div className="row">
                    <p>Total</p>
                    <p>{totalPrice} kr</p>
                </div>
            </div>
        </div>
    );
};

export default CartList;
