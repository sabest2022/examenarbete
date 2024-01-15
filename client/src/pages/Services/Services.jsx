
import React from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Services.css'

// import './Services.css'
const HomeSection = ({ title, children }) => {
    return (
        <section className="home-section">
            <h2>{title}</h2>
            <div>{children}</div>
        </section>
    );
};
const Plan = ({ plan }) => {
    return (
        <div className="plan-container">
            <h2>{plan.title}</h2>
            <p>{plan.description}</p>
            <p>Price: {plan.price}</p>
            <p>Responsive: {plan.responsive ? 'Yes' : 'No'}</p>
            <p>Pages: {plan.pages}</p>
        </div>
    );
};
const Services = () => {
    const [plans, setPlans] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/plans'); // Adjust the URL to your backend endpoint
                setPlans(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchPlans();
    }, []);
    return (
        <div className="home">
            <Header />
            <main className="home-content">
                <HomeSection title="Welcome to Sabest">
                    <p>At Sabest, This is services page</p>
                </HomeSection>
                <h1>Our Plans</h1>
                {error && <p>There was an error fetching the plans: {error}</p>}
                <div className="plans-list">
                    {plans.map(plan => (
                        <Plan key={plan._id} plan={plan} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );

}

export default Services;

