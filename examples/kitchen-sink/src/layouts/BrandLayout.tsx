import React, { useState, useEffect } from 'react'
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

/** CSS reset for react-router <Link> and <a> elements */
const LINK_RESET: React.CSSProperties = {
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
}

interface SidebarSubItem {
  label: string
  anchor: string
}

interface SidebarItem {
  path: string
  label: string
  subItems?: SidebarSubItem[]
}

interface SidebarGroup {
  label: string
  items: SidebarItem[]
}

const sidebarGroups: SidebarGroup[] = [
  {
    label: 'Overview',
    items: [{ path: '', label: 'Home' }],
  },
  {
    label: 'Primitives',
    items: [
      {
        path: 'primitives',
        label: 'All Primitives',
        subItems: [
          { label: 'AspectRatio', anchor: 'aspectratio' },
          { label: 'Badge', anchor: 'badge' },
          { label: 'Box', anchor: 'box' },
          { label: 'Divider', anchor: 'divider' },
          { label: 'Heading', anchor: 'heading' },
          { label: 'Label', anchor: 'label' },
          { label: 'Separator', anchor: 'separator' },
          { label: 'Skeleton', anchor: 'skeleton' },
          { label: 'Spacer', anchor: 'spacer' },
          { label: 'Stack/VStack/HStack', anchor: 'stack-vstack-hstack' },
          { label: 'Text', anchor: 'text' },
          { label: 'VisuallyHidden', anchor: 'visuallyhidden' },
        ],
      },
    ],
  },
  {
    label: 'Components',
    items: [
      {
        path: 'components/buttons',
        label: 'Buttons & Actions',
        subItems: [
          { label: 'Button', anchor: 'button' },
          { label: 'ButtonGroup', anchor: 'buttongroup' },
          { label: 'Pagination', anchor: 'pagination' },
          { label: 'Toggle', anchor: 'toggle' },
        ],
      },
      {
        path: 'components/data',
        label: 'Data Display',
        subItems: [
          { label: 'Accordion', anchor: 'accordion' },
          { label: 'Alert', anchor: 'alert' },
          { label: 'Avatar', anchor: 'avatar' },
          { label: 'Breadcrumb', anchor: 'breadcrumb' },
          { label: 'Card', anchor: 'card' },
          { label: 'Carousel', anchor: 'carousel' },
          { label: 'Collapsible', anchor: 'collapsible' },
          { label: 'Kbd', anchor: 'kbd' },
          { label: 'Loader', anchor: 'loader' },
          { label: 'Progress', anchor: 'progress' },
          { label: 'Table', anchor: 'table' },
          { label: 'Typography', anchor: 'typography' },
        ],
      },
      {
        path: 'components/forms',
        label: 'Forms & Inputs',
        subItems: [
          { label: 'Calendar', anchor: 'calendar' },
          { label: 'Checkbox', anchor: 'checkbox' },
          { label: 'Combobox', anchor: 'combobox' },
          { label: 'DatePicker', anchor: 'datepicker' },
          { label: 'DateRangePicker', anchor: 'daterangepicker' },
          { label: 'Form', anchor: 'form' },
          { label: 'Input', anchor: 'input' },
          { label: 'InputOTP', anchor: 'inputotp' },
          { label: 'NativeSelect', anchor: 'nativeselect' },
          { label: 'RadioGroup', anchor: 'radiogroup' },
          { label: 'Select', anchor: 'select' },
          { label: 'Slider', anchor: 'slider' },
          { label: 'Switch', anchor: 'switch' },
          { label: 'Textarea', anchor: 'textarea' },
        ],
      },
      {
        path: 'components/menus',
        label: 'Menus & Navigation',
        subItems: [
          { label: 'Command', anchor: 'command' },
          { label: 'ContextMenu', anchor: 'contextmenu' },
          { label: 'DropdownMenu', anchor: 'dropdownmenu' },
          { label: 'Menubar', anchor: 'menubar' },
          { label: 'NavigationMenu', anchor: 'navigationmenu' },
          { label: 'Resizable', anchor: 'resizable' },
          { label: 'ScrollArea', anchor: 'scrollarea' },
          { label: 'Sidebar', anchor: 'sidebar' },
          { label: 'Tabs', anchor: 'tabs' },
        ],
      },
      {
        path: 'components/overlays',
        label: 'Overlays',
        subItems: [
          { label: 'AlertDialog', anchor: 'alertdialog' },
          { label: 'Dialog', anchor: 'dialog' },
          { label: 'Drawers & Panels', anchor: 'drawers-panels' },
          { label: 'HoverCard', anchor: 'hovercard' },
          { label: 'Tooltip', anchor: 'tooltip' },
        ],
      },
    ],
  },
  {
    label: 'Composed',
    items: [
      {
        path: 'composed',
        label: 'All Composed',
        subItems: [
          { label: 'Accordion', anchor: 'accordion' },
          { label: 'AlertDialog', anchor: 'alertdialog' },
          { label: 'Breadcrumb', anchor: 'breadcrumb' },
          { label: 'Collapsible', anchor: 'collapsible' },
          { label: 'Form', anchor: 'form' },
          { label: 'Table', anchor: 'table' },
        ],
      },
    ],
  },
  {
    label: 'Hooks',
    items: [
      {
        path: 'hooks',
        label: 'All Hooks',
        subItems: [
          { label: 'useControllableState', anchor: 'usecontrollablestate' },
          { label: 'useFocusTrap', anchor: 'usefocustrap' },
          { label: 'useKeyboardNavigation', anchor: 'usekeyboardnavigation' },
        ],
      },
    ],
  },
]

function NavGroup({
  group,
  brandKey,
  currentSection,
  currentHash,
  onNavClick,
}: {
  group: SidebarGroup
  brandKey: string
  currentSection: string
  currentHash: string
  onNavClick: () => void
}) {
  return (
    <YStack marginBottom="$0.75">
      <h2
        style={{
          margin: 0,
          padding: '8px 16px',
          fontSize: 12,
          fontWeight: 500,
          textTransform: 'uppercase' as const,
          letterSpacing: 0.5,
          color: 'var(--colorSubtitle)',
          fontFamily: 'var(--f-body)',
        }}
      >
        {group.label}
      </h2>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {group.items.map((item) => {
          const isActive = currentSection === item.path
          return (
            <li key={item.path}>
              <Link
                to={`/${brandKey}/${item.path}`}
                onClick={onNavClick}
                style={LINK_RESET}
              >
                <XStack
                  paddingVertical={6}
                  paddingLeft={16}
                  paddingRight={8}
                  borderRightWidth={2}
                  borderRightColor={isActive ? '$color' : 'transparent'}
                  backgroundColor={isActive ? '$color3' : 'transparent'}
                  /* transition is CSS animation */
                  style={{ transition: 'all 0.1s' }}
                >
                  <Text
                    fontSize={14}
                    fontFamily="$body"
                    color={isActive ? '$color' : '$colorSubtitle'}
                    fontWeight={isActive ? '500' : '400'}
                  >
                    {item.label}
                  </Text>
                </XStack>
              </Link>
              {item.subItems && isActive && (
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {item.subItems.map((sub) => {
                    const isSubActive = currentHash === `#${sub.anchor}`
                    return (
                      <li key={sub.anchor}>
                        <Link
                          to={`/${brandKey}/${item.path}#${sub.anchor}`}
                          onClick={(e) => {
                            onNavClick()
                            const el = document.getElementById(sub.anchor)
                            if (el) {
                              e.preventDefault()
                              el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                              window.history.replaceState(null, '', `/${brandKey}/${item.path}#${sub.anchor}`)
                            }
                          }}
                          style={LINK_RESET}
                        >
                          <XStack
                            paddingVertical="$0.25"
                            paddingLeft={36}
                            paddingRight="$2"
                            /* transition is CSS animation */
                            style={{ transition: 'all 0.1s' }}
                          >
                            <Text
                              fontSize={12}
                              fontFamily="$body"
                              color={isSubActive ? '$color' : '$colorSubtitle'}
                              fontWeight={isSubActive ? '500' : '400'}
                            >
                              {sub.label}
                            </Text>
                          </XStack>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
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
  const currentHash = location.hash

  // Sync body background with current theme so areas outside the React root match
  useEffect(() => {
    requestAnimationFrame(() => {
      const root = document.querySelector('.brand-layout') as HTMLElement | null
      if (root) {
        const bg = getComputedStyle(root).backgroundColor
        document.documentElement.style.backgroundColor = bg
        document.body.style.backgroundColor = bg
      }
    })
  }, [theme])

  // Scroll to anchor when hash changes (React Router doesn't do this natively)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      // Delay slightly to allow the page to render after route change
      const timer = setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [location.hash, location.pathname])

  return (
    <Provider config={activeBrand.config} defaultTheme={theme}>
      <YStack className="brand-layout" minHeight="100vh" backgroundColor="$background" color="$color" fontFamily="$body">
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
        <XStack flex={1} alignItems="stretch">
          {/* Sidebar */}
          <nav
            aria-label="Sidebar navigation"
            className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}
            style={{
              width: 240,
              flexShrink: 0,
              borderRight: '1px solid var(--borderColor)',
              paddingTop: 16,
              paddingBottom: 16,
              backgroundColor: 'var(--background)',
              position: 'sticky',
              top: 56,
              overflowY: 'auto',
              height: 'calc(100vh - 56px)',
            }}
          >
            {sidebarGroups.map((group) => (
              <NavGroup
                key={group.label}
                group={group}
                brandKey={brandKey}
                currentSection={currentSection}
                currentHash={currentHash}
                onNavClick={() => setSidebarOpen(false)}
              />
            ))}
          </nav>

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
          /* Focus-visible ring for all interactive elements */
          .brand-layout button:focus-visible,
          .brand-layout a:focus-visible {
            outline: 2px solid var(--color10);
            outline-offset: 1px;
            border-radius: 4px;
          }
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
