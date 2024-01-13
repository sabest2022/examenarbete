
import background from './assets/background.png';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.css'





function App() {


  return (
    <div className="app" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

      <Header />
      <main style={{ flex: 1 }}>


      </main>

      <Footer />
    </div>
  );

}

export default App
