import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { TamaguiProvider } from 'tamagui'
import { router } from './router'
import { kinshipConfig } from './theme/datingBrand'

export const ThemeContext = React.createContext<{
  theme: 'light' | 'dark'
  setTheme: (t: 'light' | 'dark') => void
}>({
  theme: 'light',
  setTheme: () => {},
})

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <TamaguiProvider config={kinshipConfig} defaultTheme={theme}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    </TamaguiProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
