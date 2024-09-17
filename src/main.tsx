import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PresupuestoProvider } from './context/PresupuestoContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PresupuestoProvider>
      <App />
    </PresupuestoProvider>
  </StrictMode>,
)
