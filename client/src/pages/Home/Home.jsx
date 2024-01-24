import { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Home.css'

// Update HomeSection to accept an 'isActive' prop
const HomeSection = ({ title, children, isActive, onTitleClick }) => {
    return (
        <section className={`home-section ${isActive ? 'active' : ''}`}>

            <h3 className="title" onClick={onTitleClick}>{title}</h3>
            {isActive && <div>{children}</div>}
        </section>
    );
};

const Home = () => {
    // State to keep track of the active section
    const [activeSection, setActiveSection] = useState(null);

    // A function to handle clicking on a section title
    const handleTitleClick = (sectionTitle) => {
        setActiveSection(sectionTitle);
    };

    return (

        <div className="home">
            <Header />
            <main className="home-content">

                {/* Add a title click handler to each section */}
                <div className="title-container" onClick={() => handleTitleClick('Welcome to Sabest')}>
                    <HomeSection
                        title="Welcome to Sabest"
                        isActive={activeSection === 'Welcome to Sabest'}
                        onTitleClick={() => handleTitleClick('Welcome to Sabest')}
                    >
                        <p>At Sabest, we believe that exceptional web design is about crafting an engaging user experience that resonates with your audience. Our services are tailored to elevate your brand, streamline your operations, and convert visitors into loyal customers.</p>

                    </HomeSection>
                </div>
                <div className="title-container" onClick={() => handleTitleClick('Why Choose Us?')}>
                    <HomeSection title="Why Choose Us?" isActive={activeSection === 'Why Choose Us?'}>
                        <p>We stand out in the digital landscape by embracing simplicity. Our focused approach means we deliver top-tier web design services without the clutter of unnecessary options. We cut through the noise to provide you with what truly matters for your online success.</p>

                    </HomeSection>
                </div>
                <div className="title-container" onClick={() => handleTitleClick('Our Web Design Services')}>
                    <HomeSection title="Our Web Design Services" isActive={activeSection === 'Our Web Design Services'}>
                        <p>Bespoke Design: Your brand is unique, and your website should be too. We create custom designs that align perfectly with your brand identity.
                            Responsive Layouts: With a mobile-first philosophy, we ensure your site looks and functions seamlessly on all devices.
                            User-Centric Approach: Engaging user experiences are at the heart of what we do. We prioritize usability
                            to keep your visitors coming back..</p>
                    </HomeSection>
                </div>
                <div className="title-container" onClick={() => handleTitleClick('Our Philosophy - Simplicity in Service')}>
                    <HomeSection title="Our Philosophy - Simplicity in Service" isActive={activeSection === 'Our Philosophy - Simplicity in Service'}>
                        <p>In a world bustling with endless options, we chose a path less cluttered. Sabest embraces the power of simplicity to bring clarity and effectiveness to our work. We believe in doing fewer things exceptionally well rather than spreading ourselves too thin. This focused approach allows us to deliver top-notch designs and results-driven websites.

                            We understand that your time is valuable, and navigating through complex service offerings can be overwhelming. That's why we've honed our services to what truly matters in web design - creating beautiful, functional, and user-friendly websites that stand the test of time.

                            Join us on this journey of simplicity and let Sabest be the beacon that guides your brand to digital excellence. Because when it comes to impactful web design, less is indeed more.</p>

                    </HomeSection>
                </div>

                <div className="title-container" onClick={() => handleTitleClick('Ready to start your project')}>
                    <HomeSection title="Ready to start your project?" isActive={activeSection === 'Ready to start your project'}>
                        Contact us today and let's create a web experience that embodies the essence of your brand.

                    </HomeSection>
                </div>

            </main>
            <Footer />
        </div>
    );
}

export default Home;
