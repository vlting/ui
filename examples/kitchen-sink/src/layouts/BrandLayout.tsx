import React, { useState } from 'react'
import { Outlet, useParams, useLocation, Link } from 'react-router-dom'
import { Provider } from '@vlting/ui'
import { brands, activeBrand, type BrandKey } from '../brands'

function paletteColor(isDark: boolean, index: number): string {
  const palette = isDark
    ? activeBrand.definition.palettes.dark
    : activeBrand.definition.palettes.light
  return palette[index]
}

const navLinks = [
  { path: '', label: 'Home' },
  { path: 'primitives', label: 'Primitives' },
  { path: 'components', label: 'Components' },
  { path: 'composed', label: 'Composed' },
  { path: 'headless', label: 'Headless' },
  { path: 'hooks', label: 'Hooks' },
]

const sidebarGroups = [
  {
    label: 'Getting Started',
    items: [{ path: '', label: 'Overview' }],
  },
  {
    label: 'Primitives',
    items: [
      { path: 'primitives', label: 'All Primitives' },
    ],
  },
  {
    label: 'Form',
    items: [
      { path: 'components', label: 'All Components' },
      { path: 'components/inputs', label: 'Inputs' },
    ],
  },
  {
    label: 'Overlay',
    items: [
      { path: 'components/overlays', label: 'Overlays' },
    ],
  },
  {
    label: 'Navigation',
    items: [
      { path: 'components/menus', label: 'Menus' },
    ],
  },
  {
    label: 'Layout',
    items: [
      { path: 'components/layout', label: 'Layout' },
      { path: 'components/typography', label: 'Typography' },
    ],
  },
  {
    label: 'Composed',
    items: [
      { path: 'composed', label: 'All Composed' },
    ],
  },
]

export function BrandLayout() {
  const { brand = 'default' } = useParams<{ brand: string }>()
  const location = useLocation()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const brandKey = (brand in brands ? brand : 'default') as BrandKey
  const currentSection = location.pathname.split('/').slice(2).join('/') || ''

  const isDark = theme === 'dark'
  const bg = paletteColor(isDark, 0)
  const fg = paletteColor(isDark, 11)
  const muted = paletteColor(isDark, 7)
  const border = paletteColor(isDark, 4)
  const bgMuted = paletteColor(isDark, 1)
  const bgHover = paletteColor(isDark, 2)
  const accent = paletteColor(isDark, 10)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: bg, color: fg, fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* ─── Header ─── */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: 56,
        borderBottom: `1px solid ${border}`,
        backgroundColor: bg,
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: fg,
              fontSize: 20,
              cursor: 'pointer',
              padding: '4px 8px',
            }}
            className="mobile-hamburger"
          >
            ☰
          </button>
          <Link to={`/${brandKey}`} style={{ textDecoration: 'none', color: fg }}>
            <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: -0.3 }}>@vlting/ui</span>
          </Link>
          <nav style={{ display: 'flex', gap: 2 }} className="desktop-nav">
            {navLinks.map((s) => {
              const isActive = currentSection === s.path
              return (
                <Link
                  key={s.path}
                  to={`/${brandKey}/${s.path}`}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    textDecoration: 'none',
                    fontSize: 14,
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? fg : muted,
                    transition: 'color 0.15s',
                  }}
                >
                  {s.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Brand selector */}
          {Object.entries(brands).map(([key, b]) => (
            <button
              key={key}
              onClick={() => { window.location.href = `/${key}/${currentSection}` }}
              style={{
                padding: '5px 12px',
                borderRadius: 6,
                border: `1px solid ${brandKey === key ? accent : border}`,
                backgroundColor: brandKey === key ? (isDark ? '#27272a' : '#f4f4f5') : 'transparent',
                color: brandKey === key ? fg : muted,
                cursor: 'pointer',
                fontWeight: brandKey === key ? 500 : 400,
                fontSize: 13,
                transition: 'all 0.15s',
                fontFamily: 'inherit',
              }}
            >
              {b.label}
            </button>
          ))}
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            style={{
              padding: '5px 12px',
              borderRadius: 6,
              border: `1px solid ${border}`,
              backgroundColor: 'transparent',
              color: muted,
              cursor: 'pointer',
              fontSize: 13,
              fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      {/* ─── Body: Sidebar + Content ─── */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside
          style={{
            width: 240,
            flexShrink: 0,
            borderRight: `1px solid ${border}`,
            padding: '16px 0',
            overflowY: 'auto',
            height: 'calc(100vh - 56px)',
            position: 'sticky',
            top: 56,
            backgroundColor: bg,
          }}
          className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}
        >
          {sidebarGroups.map((group) => (
            <div key={group.label} style={{ marginBottom: 16 }}>
              <div style={{
                padding: '4px 16px',
                fontSize: 12,
                fontWeight: 500,
                color: muted,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}>
                {group.label}
              </div>
              {group.items.map((item) => {
                const isActive = currentSection === item.path
                return (
                  <Link
                    key={item.path}
                    to={`/${brandKey}/${item.path}`}
                    onClick={() => setSidebarOpen(false)}
                    style={{
                      display: 'block',
                      padding: '6px 16px 6px 24px',
                      fontSize: 14,
                      textDecoration: 'none',
                      color: isActive ? fg : muted,
                      fontWeight: isActive ? 500 : 400,
                      backgroundColor: isActive ? bgHover : 'transparent',
                      borderRight: isActive ? `2px solid ${fg}` : '2px solid transparent',
                      transition: 'all 0.1s',
                    }}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          ))}
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              top: 56,
              backgroundColor: 'rgba(0,0,0,0.4)',
              zIndex: 30,
            }}
            className="sidebar-overlay"
          />
        )}

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          <Provider config={activeBrand.config} defaultTheme={theme}>
            <Outlet />
          </Provider>
        </main>
      </div>

      {/* ─── Inline responsive styles ─── */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-hamburger { display: inline-flex !important; }
          .desktop-nav { display: none !important; }
          .sidebar {
            position: fixed !important;
            top: 56px !important;
            left: -240px !important;
            height: calc(100vh - 56px) !important;
            z-index: 35 !important;
            transition: left 0.2s ease !important;
          }
          .sidebar.sidebar-open {
            left: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
