
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        {/* Define more routes as needed */}
      </Routes>
    </Router>
  );
}
export default App;