import { useState } from 'react'
import background from './assets/background.png';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.css'





function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

      <Header />
      <main style={{ flex: 1 }}>

        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>


        </div>
      </main>

      <Footer />
    </div>
  );

}

export default App
