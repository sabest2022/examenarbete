
import React from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import './About.css'
const HomeSection = ({ title, children }) => {
    return (
        <section className="home-section">
            <h2>{title}</h2>
            <div>{children}</div>
        </section>
    );
};

const About = () => {
    return (
        <div className="home" >
            <Header />
            <main className="home-content">
                <HomeSection title="Welcome to Sabest">
                    <p>At Sabest, This is about page</p>
                </HomeSection>


            </main>


            <Footer />
        </div>
    );
}

export default About;

