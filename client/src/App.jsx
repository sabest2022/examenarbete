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
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            This is a template to develop with Vite-React + Express + Mongos frameworks
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );

}

export default App
