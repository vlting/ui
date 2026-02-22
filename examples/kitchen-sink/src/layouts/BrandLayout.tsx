import React, { useState } from 'react'
import { Outlet, useParams, useLocation, Link } from 'react-router-dom'
import { Provider } from '@vlting/ui'
import { brands, activeBrand, type BrandKey } from '../brands'

const sections = [
  { path: '', label: 'Home' },
  { path: 'primitives', label: 'Primitives' },
  { path: 'components', label: 'Components' },
  { path: 'headless', label: 'Headless' },
  { path: 'hooks', label: 'Hooks' },
]

export function BrandLayout() {
  const { brand = 'default' } = useParams<{ brand: string }>()
  const location = useLocation()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const brandKey = (brand in brands ? brand : 'default') as BrandKey
  const currentSection = location.pathname.split('/').slice(2).join('/') || ''

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top nav — outside Provider, uses plain HTML/CSS */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
        color: theme === 'dark' ? '#f0f0f0' : '#111',
        transition: 'background-color 0.2s, color 0.2s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <span style={{ fontWeight: 700, fontSize: '16px' }}>@vlting/ui</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {sections.map((s) => {
              const isActive = currentSection === s.path
              return (
                <Link
                  key={s.path}
                  to={`/${brandKey}/${s.path}`}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#fff' : (theme === 'dark' ? '#ccc' : '#555'),
                    backgroundColor: isActive ? '#3b8fdb' : 'transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  {s.label}
                </Link>
              )
            })}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Brand selector — uses window.location.href to force page reload,
              because Tamagui's config is a module-level singleton that can't
              be swapped at runtime */}
          {Object.entries(brands).map(([key, b]) => (
            <button
              key={key}
              onClick={() => { window.location.href = `/${key}/${currentSection}` }}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: brandKey === key ? '2px solid #3b8fdb' : '1px solid #ccc',
                backgroundColor: brandKey === key ? (theme === 'dark' ? '#2a2a2a' : '#f0f7ff') : 'transparent',
                color: theme === 'dark' ? '#f0f0f0' : '#333',
                cursor: 'pointer',
                fontWeight: brandKey === key ? 600 : 400,
                fontSize: '13px',
                transition: 'all 0.15s',
              }}
            >
              {b.label}
            </button>
          ))}
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              backgroundColor: 'transparent',
              color: theme === 'dark' ? '#f0f0f0' : '#333',
              cursor: 'pointer',
              fontSize: '13px',
              transition: 'all 0.15s',
            }}
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </div>
      </nav>

      {/* Content area — single Provider with the config created at page load */}
      <div style={{ flex: 1, backgroundColor: theme === 'dark' ? '#111' : '#f5f5f5' }}>
        <Provider config={activeBrand.config} defaultTheme={theme}>
          <Outlet />
        </Provider>
      </div>
    </div>
  )
}
