import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { StlProvider } from '@vlting/stl-react'
import { useColorMode } from '@vlting/stl-react'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/styling', label: 'Styling & Tokens' },
  { to: '/primitives', label: 'Primitives' },
  { to: '/components', label: 'Components' },
  { to: '/forms', label: 'Forms' },
  { to: '/overlays', label: 'Overlays & Modals' },
  { to: '/data-display', label: 'Data Display' },
  { to: '/navigation', label: 'Navigation' },
  { to: '/hooks', label: 'Hooks' },
  { to: '/blocks', label: 'Blocks' },
  { to: '/icons', label: 'Icons' },
]

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <button
      onClick={toggleColorMode}
      style={{
        padding: '6px 12px',
        borderRadius: 6,
        border: '1px solid var(--stl-borderColor, #ddd)',
        background: 'var(--stl-surface1, #f5f5f5)',
        color: 'var(--stl-color, #111)',
        cursor: 'pointer',
        fontSize: 14,
      }}
    >
      {colorMode === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}

function Sidebar() {
  return (
    <nav
      style={{
        width: 240,
        minHeight: '100vh',
        borderRight: '1px solid var(--stl-borderColor, #e5e5e5)',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start',
        overflow: 'auto',
      }}
    >
      <div style={{ padding: '0 16px 16px', fontWeight: 700, fontSize: 18 }}>
        @vlting/stl
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            style={({ isActive }) => ({
              display: 'block',
              padding: '8px 16px',
              textDecoration: 'none',
              fontSize: 14,
              color: isActive ? 'var(--stl-primary6, #0066ff)' : 'var(--stl-color, #333)',
              backgroundColor: isActive ? 'var(--stl-surface2, #f0f0ff)' : 'transparent',
              fontWeight: isActive ? 600 : 400,
              borderRight: isActive ? '2px solid var(--stl-primary6, #0066ff)' : '2px solid transparent',
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

function LayoutInner() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 24px',
            borderBottom: '1px solid var(--stl-borderColor, #e5e5e5)',
            position: 'sticky',
            top: 0,
            background: 'var(--stl-background, #fff)',
            zIndex: 10,
          }}
        >
          <h1 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
            STL Showcase
          </h1>
          <ThemeToggle />
        </header>
        <main style={{ padding: 24, maxWidth: 1200 }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export function ShowcaseLayout() {
  return (
    <StlProvider defaultColorMode="light">
      <LayoutInner />
    </StlProvider>
  )
}
