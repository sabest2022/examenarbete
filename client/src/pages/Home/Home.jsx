
import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import background from '../../assets/background.png';

const Home = () => {
    return (
        <div className="app" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <Header />
            <main >

            </main>

            <Footer />
        </div>
    );
}

export default Home;

