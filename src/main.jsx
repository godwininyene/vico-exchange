import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';

import { registerSW } from 'virtual:pwa-register'
import InstallPrompt from './components/InstallPrompt.jsx';

registerSW({
  onNeedRefresh() {
    console.log('New update available')
  },
  onOfflineReady() {
    console.log('App ready for offline use')
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InstallPrompt/>
    <App />
    <ToastContainer position="top-right" autoClose={5000} />
  </StrictMode>,
)
