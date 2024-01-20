

import App from './App.jsx'
import './index.css'
import { createRoot } from 'react-dom/client';

import { UserProvider } from './context/UserContext';
import { PlanProvider } from './context/PlanContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import OrderProvider from './context/OrderContext.jsx';

createRoot(document.getElementById('root')).render(
  <OrderProvider>
    <PlanProvider>
      <CartProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </CartProvider>
    </PlanProvider>
  </OrderProvider>,

)
