import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { Outlet, useParams, useLocation, Link } from 'react-router-dom'
import { Provider } from '@vlting/ui'
import { brands, activeBrand, type BrandKey } from '../brands'

function paletteColor(isDark: boolean, index: number): string {
  const palette = isDark
    ? activeBrand.definition.palettes.dark
    : activeBrand.definition.palettes.light
  return palette[index]
}

interface SidebarGroup {
  label: string
  items: { path: string; label: string }[]
}

const sidebarGroups: SidebarGroup[] = [
  {
    label: 'Overview',
    items: [{ path: '', label: 'Home' }],
  },
  {
    label: 'Primitives',
    items: [
      { path: 'primitives', label: 'All Primitives' },
    ],
  },
  {
    label: 'Components',
    items: [
      { path: 'components/buttons', label: 'Buttons & Actions' },
      { path: 'components/data', label: 'Data Display' },
      { path: 'components/forms', label: 'Forms & Inputs' },
      { path: 'components/menus', label: 'Menus & Navigation' },
      { path: 'components/overlays', label: 'Overlays' },
    ],
  },
  {
    label: 'Composed',
    items: [
      { path: 'composed', label: 'All Composed' },
    ],
  },
  {
    label: 'Hooks',
    items: [
      { path: 'hooks', label: 'All Hooks' },
    ],
  },
]

function CollapsibleGroup({
  group,
  brandKey,
  currentSection,
  expanded,
  onToggle,
  onNavClick,
  fg,
  muted,
  bgHover,
}: {
  group: SidebarGroup
  brandKey: string
  currentSection: string
  expanded: boolean
  onToggle: () => void
  onNavClick: () => void
  fg: string
  muted: string
  bgHover: string
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [expanded, group.items.length])

  const hasMultipleItems = group.items.length > 1

  return (
    <div style={{ marginBottom: 8 }}>
      <button
        onClick={hasMultipleItems ? onToggle : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '6px 16px',
          fontSize: 12,
          fontWeight: 500,
          color: muted,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          background: 'none',
          border: 'none',
          cursor: hasMultipleItems ? 'pointer' : 'default',
          fontFamily: 'inherit',
          textAlign: 'left',
        }}
      >
        {group.label}
        {hasMultipleItems && (
          <span style={{
            fontSize: 10,
            transition: 'transform 0.2s ease',
            transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
            display: 'inline-block',
          }}>
            ▶
          </span>
        )}
      </button>
      <div
        ref={contentRef}
        style={{
          overflow: 'hidden',
          maxHeight: expanded ? (contentHeight ?? 500) : 0,
          transition: 'max-height 0.2s ease',
        }}
      >
        {group.items.map((item) => {
          const isActive = currentSection === item.path
          return (
            <Link
              key={item.path}
              to={`/${brandKey}/${item.path}`}
              onClick={onNavClick}
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
    </div>
  )
}

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
  const bgHover = paletteColor(isDark, 2)
  const accent = paletteColor(isDark, 10)

  // Determine which group contains the active route
  const activeGroupLabel = useMemo(() => {
    for (const group of sidebarGroups) {
      if (group.items.some((item) => item.path === currentSection)) {
        return group.label
      }
    }
    return ''
  }, [currentSection])

  // Track expanded groups — auto-expand the active group and all single-item groups
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    for (const group of sidebarGroups) {
      if (group.items.length <= 1) {
        initial.add(group.label)
      }
    }
    if (activeGroupLabel) {
      initial.add(activeGroupLabel)
    }
    return initial
  })

  // Auto-expand when navigating to a new group
  useEffect(() => {
    if (activeGroupLabel) {
      setExpandedGroups((prev) => {
        if (prev.has(activeGroupLabel)) return prev
        const next = new Set(prev)
        next.add(activeGroupLabel)
        return next
      })
    }
  }, [activeGroupLabel])

  const toggleGroup = useCallback((label: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(label)) {
        next.delete(label)
      } else {
        next.add(label)
      }
      return next
    })
  }, [])

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
            <CollapsibleGroup
              key={group.label}
              group={group}
              brandKey={brandKey}
              currentSection={currentSection}
              expanded={expandedGroups.has(group.label)}
              onToggle={() => toggleGroup(group.label)}
              onNavClick={() => setSidebarOpen(false)}
              fg={fg}
              muted={muted}
              bgHover={bgHover}
            />
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
