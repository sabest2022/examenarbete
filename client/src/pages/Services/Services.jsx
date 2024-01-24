import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import PlanCard from '../../components/PlanCard/PlanCard';
import { usePlanContext } from '../../context/PlanContext';

import "./services.css";

const Services = () => {

    const { plans } = usePlanContext();
    if (!plans || plans.length === 0) {
        return <div>Loading plans...</div>; // or some other placeholder
    }
    return (
        <div className="home">
            <Header />
            <div className="products-container">
                {plans.map((plan) => (
                    <PlanCard
                        key={plan._id}
                        _id={plan._id}
                        title={plan.title}
                        pages={plan.pages}
                        responsive={plan.responsive}
                        price={plan.price}
                        description={plan.description}
                        image={plan.image}

                    />
                ))}
            </div>
            <Footer />
        </div>
    );
};
//<ProductCard key={product._id} {...product} />
export default Services;

