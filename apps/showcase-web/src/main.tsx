import '@vlting/stl/styles'
import { StlProvider } from '@vlting/stl-react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StlProvider defaultColorMode="light">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StlProvider>,
)
