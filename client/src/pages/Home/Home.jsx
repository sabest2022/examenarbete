
import React from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import background from '../../assets/background.png';
import './Home.css'

const Home = () => {
    return (
        <div className="home" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <Header />
            <main style={{ flex: 1 }} >

            </main>

            <Footer />
        </div>
    );
}

export default Home;

