

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Admin from './pages/Admin/Admin';
import Services from './pages/Services/Services';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Checkout from './components/Checkout/Checkout';
import Confirmation from './pages/Confirmation/Confirmation';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confirmation" element={<Confirmation />} />
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