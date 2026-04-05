import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TanstackProvider from './lib/TanstackProvider.jsx'
import { store } from './states/store.js'
import { Provider } from 'react-redux'


createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <TanstackProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </TanstackProvider>
  // </StrictMode> 
)
