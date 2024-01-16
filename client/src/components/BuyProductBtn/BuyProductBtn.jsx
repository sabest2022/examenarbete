

import { useCartContext } from '../../context/CartContext';
import './BuyProductBtn.css';

function BuyProductBtn({ _id, cssClass }) {
    const { addToCart } = useCartContext();

    function handleDecreaseInStock() {
        console.log('Plan ID is: ', _id);
        addToCart(_id);
    }

    return (
        <div onClick={handleDecreaseInStock} className={cssClass}  >Order</div>
    );
}

export default BuyProductBtn;