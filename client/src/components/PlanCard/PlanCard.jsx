

import BuyProductBtn from '../BuyProductBtn/BuyProductBtn';
import './PlanCard.css'




function PlanCard({ _id, title, description, price, responsive, pages, plan, image }) {

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
