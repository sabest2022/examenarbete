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
    const { getPlan } = usePlanContext();

    // Initialize state from local storage
    const [cartItems, setCartItems] = useState(getCartFromLocalStorage());

    useEffect(() => {
        setCartInLocalStorage(cartItems);
    }, [cartItems]);

    const addToCart = async (planId) => {
        try {
            const plan = await getPlan(planId);

            if (!plan) {
                console.error('Plan not found!');
                return;
            }

            setCartItems((currentItems) => {
                const existingCartItemIndex = currentItems.findIndex((item) => item.plan && item.plan._id === plan._id);

                if (existingCartItemIndex !== -1) {
                    // Plan already exists in cart, update the quantity
                    const updatedItems = [...currentItems];
                    updatedItems[existingCartItemIndex] = {
                        ...updatedItems[existingCartItemIndex],
                        quantity: updatedItems[existingCartItemIndex].quantity + 1
                    };
                    return updatedItems;
                } else {
                    // Plan is new to the cart, add it
                    return [...currentItems, { plan, quantity: 1 }];
                }
            });
        } catch (error) {
            console.error('Error adding plan to cart:', error);
        }
    };





    const removeFromCart = (plan) => {
        setCartItems((currentItems) =>
            currentItems.filter((item) => item.plan._id !== plan._id)
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