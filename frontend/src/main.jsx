import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TanstackProvider from '../lib/TanstackProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TanstackProvider>
    
        <App />
      
    </TanstackProvider>
  </StrictMode>,
)
