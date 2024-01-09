import { useState } from 'react'
import LoginButton from './components/Login/Login'
import './App.css'
import { UserProvider } from './context/UserContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserProvider>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          This is a template to develope with Vite-React + Express + Mongos frameworks
        </p>
        <LoginButton />
      </div>

    </UserProvider>
  )
}

export default App
