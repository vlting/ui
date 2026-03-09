import { CodeBlock } from '../../../components/code-block'

export const metadata = {
  title: 'Dark Mode — @vlting/ui',
  description: 'Set up dark mode with @vlting/ui.',
}

export default function DarkModePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Dark Mode</h1>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 16, lineHeight: 1.6 }}>
          @vlting/ui supports dark mode out of the box. All token colors automatically adapt.
        </p>
      </div>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Next.js (next-themes)</h2>
        <CodeBlock
          code={`// app/layout.tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

// app/providers.tsx
'use client'
import { StlProvider } from '@vlting/stl-react'
import { useTheme } from 'next-themes'

export function StlWrapper({ children }) {
  const { resolvedTheme } = useTheme()
  return (
    <StlProvider defaultColorMode={resolvedTheme === 'dark' ? 'dark' : 'light'}>
      {children}
    </StlProvider>
  )
}`}
          language="tsx"
        />
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Vite / SPA</h2>
        <CodeBlock
          code={`import { StlProvider, useColorMode } from '@vlting/stl-react'

function App() {
  return (
    <StlProvider defaultColorMode="light">
      <ThemeToggle />
      {/* your app */}
    </StlProvider>
  )
}

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <button onClick={toggleColorMode}>
      {colorMode === 'light' ? 'Dark' : 'Light'}
    </button>
  )
}`}
          language="tsx"
        />
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>React Native</h2>
        <CodeBlock
          code={`import { StlProvider, useColorMode } from '@vlting/stl-native'
import { Appearance } from 'react-native'

function App() {
  const colorScheme = Appearance.getColorScheme()
  return (
    <StlProvider defaultColorMode={colorScheme || 'light'}>
      {/* your app */}
    </StlProvider>
  )
}`}
          language="tsx"
        />
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>How It Works</h2>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 14, lineHeight: 1.7 }}>
          STL uses 12-step color palettes for both light and dark modes. When the color mode
          changes, all <code>$color</code>, <code>$background</code>, <code>$borderColor</code>,
          and other semantic tokens automatically resolve to the correct palette.
        </p>
        <p style={{ color: 'var(--color-muted-foreground)', fontSize: 14, lineHeight: 1.7 }}>
          The <code>useColorMode()</code> hook provides <code>colorMode</code>, <code>isDark</code>,
          <code>setColorMode()</code>, and <code>toggleColorMode()</code> for programmatic control.
        </p>
      </section>
    </div>
  )
}
