
import React from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import './Contact.css'
const HomeSection = ({ title, children }) => {
    return (
        <section className="home-section">
            <h2>{title}</h2>
            <div>{children}</div>
        </section>
    );
};

const Contact = () => {
    return (
        <div className="home" >
            <Header />
            <main className="home-content">
                <HomeSection title="Welcome to Sabest">
                    <p>At Sabest, we believe that exceptional web design is about crafting an engaging user experience that resonates with your audience. Our services are tailored to elevate your brand, streamline your operations, and convert visitors into loyal customers.</p>
                </HomeSection>

            </main>


            <Footer />
        </div>
    );
}

export default Contact;

