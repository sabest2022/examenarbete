
// import background from './assets/background.png';
// import Header from './components/Header/Header'
// import Footer from './components/Footer/Footer'
// import './App.css'





// function App() {


//   return (
//     <div className="app" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

//       <Header />
//       <main style={{ flex: 1 }}>

//       </main>

//       <Footer />
//     </div>
//   );

// }

// export default App


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Admin from './pages/Admin/Admin';
import Services from './pages/Services/Services';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Checkout from './components/Checkout/Checkout';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* Define more routes as needed */}
      </Routes>
    </Router>
  );
}
export default App;