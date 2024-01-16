import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/UserContext';
import { PlanProvider } from './context/PlanContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

ReactDOM.render(
  <PlanProvider>
    <CartProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </CartProvider>
  </PlanProvider>,

  document.getElementById('root')
)
