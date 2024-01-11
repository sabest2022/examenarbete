import { useState } from 'react'
import LoginButton from './components/Login/Login'
import './App.css'

import { useUserContext } from './context/UserContext'
import { GoogleLogout } from 'react-google-login'
const clientId =
  '152826738328-2gschac9945q44ilfue2n9c6d19nt296.apps.googleusercontent.com'

function App() {
  const [count, setCount] = useState(0)
  const { isSignedIn, logout } = useUserContext()
  const onLogoutSuccess = async () => {
    await logout()

  }
  return (
    <div className="App">
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          This is a template to develop with Vite-React + Express + Mongos frameworks
        </p>
        <div id="signinbutton">
          {!isSignedIn ? (
            <LoginButton />
          ) : (
            <GoogleLogout
              clientId={clientId}
              buttonText="Logout"
              onLogoutSuccess={onLogoutSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );

}

export default App
