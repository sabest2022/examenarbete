import { useEffect, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './Confirmation.css'
import { useUserContext } from '../../context/UserContext';
function Confirmation() {
    const { currentUser } = useUserContext();
    const { clearCart } = useContext(CartContext);
    function toFirstPage() {
        window.location = "http://localhost:5173";
    }
    const userName = currentUser?.name || "Valued Customer";
    useEffect(() => {
        if (window.location.pathname === "/confirmation") {
            // Display a success message
            clearCart();
            alert("Payment was successful!");
        }
    }, []);

    return (
        <div className="centered-container">
            <div className="centered-content">

                <div className="content-text"> <h1 className="centered-title">Thank You for Your Purchase!</h1>
                    <p>
                        Dear<span className='username'> {userName},</span>
                    </p>
                    <p> We're delighted to confirm your order. Your trust in our products and services is greatly appreciated.</p>
                    <br />
                    <p className='color'> What's Next?</p>
                    <br />
                    <p> <span className='color'>Confirmation Email:</span> You'll receive an email shortly with the details of your order.</p>
                    <br />  <p> <span className='color'>Personalized Follow-Up:</span>   Our team will reach out to you soon to gather any necessary information and materials needed to fulfill your order.</p>
                    <br /> <p><span className='color'>Stay Informed: </span>  Keep an eye on your email for updates regarding your order status and delivery details.</p>
                    <br />  <p> We're committed to ensuring a smooth and enjoyable experience for you. If you have any questions or special requests, feel free to contact us at any time.</p>
                    <p>Thank you once again for choosing us. We're excited to get everything ready for you!</p>
                    <br /><p className='username'>Warm regards,</p>
                    <p className='username'>Sabest team</p>
                </div>
                <button onClick={toFirstPage} className="centered-button">
                    Home!
                </button>
            </div>
        </div>
    );
}

export default Confirmation;
