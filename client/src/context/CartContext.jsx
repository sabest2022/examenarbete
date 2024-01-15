import { createContext, useContext, useState, useEffect } from 'react';
import { usePlanContext } from './PlanContext';

// Assuming Product is now just a plain JavaScript object without types
// If Product was a TypeScript type, remove or convert it to PropTypes

// Utility functions for local storage
function getCartFromLocalStorage() {
    let cart;
    if (typeof window !== 'undefined') {
        cart = localStorage.getItem('cart');
    }
    return cart ? JSON.parse(cart) : [];
}

function setCartInLocalStorage(cart) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

const initialCartContext = {
    cartItems: [],
    addToCart: () => { },
    productDecrement: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
};

export const CartContext = createContext(initialCartContext);

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { getProduct } = usePlanContext();

    // Initialize state from local storage
    const [cartItems, setCartItems] = useState(getCartFromLocalStorage());

    useEffect(() => {
        setCartInLocalStorage(cartItems);
    }, [cartItems]);

    const addToCart = (productId, quantity) => {
        const product = getProduct(productId);
        const existingCartItem = cartItems.find((item) => item.product._id === product._id);

        if (existingCartItem) {
            const updatedCartItems = cartItems.map((item) => {
                if (item.product._id === product._id) {
                    return { product, quantity: item.quantity + quantity };
                } else {
                    return item;
                }
            });
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { product, quantity }]);
        }
    };



    const removeFromCart = (product) => {
        setCartItems((currentItems) =>
            currentItems.filter((item) => item.product._id !== product._id)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };


    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Export the CartProvider as default or named export, depending on your preference
export default CartProvider;