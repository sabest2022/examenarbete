
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
                <HomeSection title="Our Story">
                    <p>Welcome to Sabest — where innovation meets design, and technology creates art.

                        Founded in 2020 by a group of passionate digital craftsmen, Sabest has grown from a humble startup to a bastion of creativity in the web design industry. Our journey began with a simple mission: to deliver stunning, high-performance websites that capture the essence of our clients’ visions.</p>
                </HomeSection>

                <HomeSection title="Our Mission">
                    <p>At Sabest, our mission is to empower businesses with the digital tools they need to thrive in the modern marketplace. We're dedicated to transforming ideas into digital realities that elevate brand presence, engage audiences, and drive growth.</p>
                </HomeSection>
                <HomeSection title="Our Values">
                    <p>Creativity: We believe that creativity is the soul of great web design. Our team is committed to pushing the boundaries of what's possible, delivering innovative solutions that stand out.
                        Quality: Excellence is non-negotiable. From pixel-perfect designs to clean, efficient code, we ensure every detail is crafted to the highest standard.
                        Integrity: We build relationships on trust. Transparency and honesty guide our interactions with clients and each other.
                        Collaboration: Great things happen when we work together. We collaborate closely with our clients to ensure their voice and vision are at the heart of our designs.</p>
                </HomeSection>
                <HomeSection title="Our Team">
                    <p>Our team is a tapestry of talented designers, developers, and strategists, each bringing a unique set of skills and perspectives to the table. We're united by a shared passion for digital excellence and a relentless drive to deliver results.</p>
                </HomeSection>
                <HomeSection title="Join Us on Our Journey">
                    <p>Whether you're a burgeoning startup or an established enterprise, we invite

                        you to join us on a journey of digital transformation. With Sabest, embark on a path where strategy, design, and technology converge to create digital experiences that not only tell your story but also grow your brand.</p>
                </HomeSection>

            </main>


            <Footer />
        </div>
    );
}

export default About;

