import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Launchpal from './Launchpal.tsx'
import LaunchpalLanding from './launchpal/LaunchpalLanding.tsx'
import LaunchpalStart from './launchpal/LaunchpalStart.tsx'
import LaunchpalTos from './launchpal/LaunchpalTos.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/launchpal" element={<LaunchpalLanding />} />
        <Route path="/launchpal/start" element={<LaunchpalStart />} />
        <Route path="/launchpal/tos" element={<LaunchpalTos />} />
        {/* Legacy route kept for backwards compat */}
        <Route path="/launchpal-old" element={<Launchpal />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
