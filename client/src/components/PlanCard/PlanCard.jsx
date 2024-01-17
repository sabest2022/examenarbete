
import { Link } from 'react-router-dom';
// import { useCartContext } from '../../context/CartContext';
import BuyProductBtn from '../BuyProductBtn/BuyProductBtn';
import './PlanCard.css'




function PlanCard({ _id, title, description, price, responsive, pages, plan, image }) {

    // function handleDecreaseInStock(_id, cssClass) {
    //     const { addToCart } = useCartContext();
    //     addToCart(_id, 1);

    //     return (
    //         <div onClick={handleDecreaseInStock}>Order</div>
    //     )
    // }
    // function shortenDescription(d) {
    //     return d.length <= 15 ? d : `${d.slice(0, 15)}...`;
    // }

    return (
        <div key={_id} className="plan-item">

            <div className="plan-details">
                <div className='plan-header'>
                    <h3>{title}</h3>
                </div>
                <p>Plan info: {description}</p>

                <p>Responsive: {responsive ? "Yes" : "No"}</p>

                <p>Pages: {pages}</p>
                <p className='plan-price'> Price: {price} kr</p>
                <div className='button-container'>
                    {/* <div className="buy" onClick={handleDecreaseInStock} >Order</div> */}
                    <BuyProductBtn _id={_id} cssClass="buy" />
                    {/* <Link to={`/product/${_id}`}>
                        <div className="info-button">Mer info</div>
                    </Link> */}
                </div>
            </div>
        </div>
    );
}

export default PlanCard;
