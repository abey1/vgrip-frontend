import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from './providers/AppProvider.tsx'
import './api/interceptor.ts'
import QueryProvider from './providers/QueryPjrovider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>,
)
