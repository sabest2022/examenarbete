import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/UserContext';

ReactDOM.render(

  //  <React.StrictMode>
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
)
