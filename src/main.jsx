import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Features/Auth/context/AuthContext.jsx'
import { CartProvider } from './Features/Cart/context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  
  <AuthProvider>
    <CartProvider>
      <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
 
  ,
)
