import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { CMSProvider } from './context/CMSContext.jsx'
import { CompareProvider } from './context/CompareContext.jsx'
import { CurrencyProvider } from './context/CurrencyContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <CartProvider>
          <ThemeProvider>
            <NotificationProvider>
              <LanguageProvider>
                <CMSProvider>
                  <CompareProvider>
                    <CurrencyProvider>
                      <WishlistProvider>
                        <App />
                      </WishlistProvider>
                    </CurrencyProvider>
                  </CompareProvider>
                </CMSProvider>
              </LanguageProvider>
            </NotificationProvider>
          </ThemeProvider>
        </CartProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
