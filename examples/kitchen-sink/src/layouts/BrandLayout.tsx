import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { Outlet, useParams, useLocation, Link } from 'react-router-dom'
import { XStack, YStack, View, Text } from 'tamagui'
import { Provider } from '@vlting/ui'
import { brands, activeBrand, type BrandKey } from '../brands'

/**
 * CSS reset for native <button> elements.
 * We keep native buttons for semantic HTML / keyboard accessibility.
 * This reset removes browser chrome so visual styling is on Tamagui children.
 */
const BUTTON_RESET: React.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  margin: 0,
  font: 'inherit',
  color: 'inherit',
  cursor: 'pointer',
  textAlign: 'left',
}

/** CSS reset for react-router <Link> elements */
const LINK_RESET: React.CSSProperties = {
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
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
}: {
  group: SidebarGroup
  brandKey: string
  currentSection: string
  expanded: boolean
  onToggle: () => void
  onNavClick: () => void
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
    <YStack marginBottom="$0.75">
      <button
        type="button"
        onClick={hasMultipleItems ? onToggle : undefined}
        style={{ ...BUTTON_RESET, cursor: hasMultipleItems ? 'pointer' : 'default', width: '100%' }}
      >
        <XStack
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          paddingVertical="$0.75"
          paddingHorizontal="$2"
        >
          <Text
            fontSize={12}
            fontWeight="500"
            color="$colorSubtitle"
            textTransform="uppercase"
            letterSpacing={0.5}
            fontFamily="$body"
          >
            {group.label}
          </Text>
          {hasMultipleItems && (
            <Text
              fontSize={10}
              /* transform is dynamically calculated from expanded state */
              style={{
                transition: 'transform 0.2s ease',
                transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                display: 'inline-block',
              }}
            >
              ▶
            </Text>
          )}
        </XStack>
      </button>
      <View
        ref={contentRef}
        overflow="hidden"
        /* maxHeight is dynamically calculated from expanded state + measured content */
        style={{
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
              style={LINK_RESET}
            >
              <XStack
                paddingVertical="$0.75"
                paddingLeft="$3.5"
                paddingRight="$2"
                borderRightWidth={2}
                borderRightColor={isActive ? '$color' : 'transparent'}
                backgroundColor={isActive ? '$color3' : 'transparent'}
                /* transition is a CSS animation property */
                style={{ transition: 'all 0.1s' }}
              >
                <Text
                  fontSize="$3"
                  fontFamily="$body"
                  color={isActive ? '$color' : '$colorSubtitle'}
                  fontWeight={isActive ? '500' : '400'}
                >
                  {item.label}
                </Text>
              </XStack>
            </Link>
          )
        })}
      </View>
    </YStack>
  )
}

export function BrandLayout() {
  const { brand = 'default' } = useParams<{ brand: string }>()
  const location = useLocation()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const brandKey = (brand in brands ? brand : 'default') as BrandKey
  const currentSection = location.pathname.split('/').slice(2).join('/') || ''

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
    <Provider config={activeBrand.config} defaultTheme={theme}>
      <YStack minHeight="100vh" backgroundColor="$background" color="$color" fontFamily="$body">
        {/* ─── Header ─── */}
        <XStack
          role="banner"
          position="sticky"
          top={0}
          zIndex={40}
          alignItems="center"
          justifyContent="space-between"
          paddingHorizontal="$3.5"
          height="$8"
          borderBottomWidth={1}
          borderBottomColor="$borderColor"
          backgroundColor="$background"
          /* backdropFilter is CSS-specific, not in Tamagui's prop system */
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <XStack alignItems="center" gap="$3.5">
            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={BUTTON_RESET}
              className="mobile-hamburger"
              aria-label="Toggle sidebar navigation"
            >
              <View paddingVertical="$0.5" paddingHorizontal="$0.75" display="none">
                <Text fontSize={20} color="$color">☰</Text>
              </View>
            </button>
            <Link to={`/${brandKey}`} style={LINK_RESET}>
              <Text fontWeight="700" fontSize={15} letterSpacing={-0.3}>@vlting/ui</Text>
            </Link>
          </XStack>
          <XStack alignItems="center" gap="$0.75">
            {/* Brand selector */}
            {Object.entries(brands).map(([key, b]) => {
              const isCurrent = brandKey === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => { window.location.href = `/${key}/${currentSection}` }}
                  style={BUTTON_RESET}
                >
                  <XStack
                    paddingVertical="$0.5"
                    paddingHorizontal="$1.5"
                    borderRadius="$2"
                    borderWidth={1}
                    borderColor={isCurrent ? '$color10' : '$borderColor'}
                    backgroundColor={isCurrent ? '$color3' : 'transparent'}
                    /* transition is CSS animation */
                    style={{ transition: 'all 0.15s' }}
                  >
                    <Text
                      fontWeight={isCurrent ? '500' : '400'}
                      fontSize={13}
                      fontFamily="$body"
                      color={isCurrent ? '$color' : '$colorSubtitle'}
                    >
                      {b.label}
                    </Text>
                  </XStack>
                </button>
              )
            })}
            {/* Theme toggle */}
            <button
              type="button"
              onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
              style={BUTTON_RESET}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              <XStack
                paddingVertical="$0.5"
                paddingHorizontal="$1.5"
                borderRadius="$2"
                borderWidth={1}
                borderColor="$borderColor"
                /* transition is CSS animation */
                style={{ transition: 'all 0.15s' }}
              >
                <Text fontSize={13} fontFamily="$body" color="$colorSubtitle">
                  {theme === 'light' ? '🌙' : '☀️'}
                </Text>
              </XStack>
            </button>
          </XStack>
        </XStack>

        {/* ─── Body: Sidebar + Content ─── */}
        <XStack flex={1}>
          {/* Sidebar */}
          <YStack
            role="navigation"
            width={240}
            flexShrink={0}
            borderRightWidth={1}
            borderRightColor="$borderColor"
            paddingVertical="$2"
            backgroundColor="$background"
            position="sticky"
            top={56}
            className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}
            /* overflowY and calc() are CSS-specific */
            style={{ overflowY: 'auto', height: 'calc(100vh - 56px)' }}
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
              />
            ))}
          </YStack>

          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <View
              position="fixed"
              top={56}
              left={0}
              right={0}
              bottom={0}
              backgroundColor="rgba(0,0,0,0.4)"
              zIndex={30}
              className="sidebar-overlay"
              onPress={() => setSidebarOpen(false)}
            />
          )}

          {/* Main content */}
          <YStack role="main" flex={1} minWidth={0}>
            <Outlet />
          </YStack>
        </XStack>

        {/* ─── Responsive styles (embedded CSS for class-based media queries) ─── */}
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
      </YStack>
    </Provider>
  )
}
