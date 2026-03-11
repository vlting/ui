'use client'

import {
  Component,
  type ComponentType,
  lazy,
  type ReactNode,
  Suspense,
  useEffect,
  useState,
} from 'react'
import type { NavGroup } from '../../../packages/blocks/sidebar/_shared'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFC = ComponentType<any>

function lazyBlock(
  loader: () => Promise<{ [key: string]: unknown }>,
  exportName: string,
): React.LazyExoticComponent<AnyFC> {
  return lazy(() =>
    loader().then(
      (m) => ({ default: (m[exportName] ?? Object.values(m)[0]) as AnyFC }),
      () => ({ default: (() => null) as unknown as AnyFC }),
    ),
  )
}

// Slug-to-component mapping. Each block is lazily loaded and code-split.
const blockComponents: Record<string, React.LazyExoticComponent<AnyFC>> = {
  auth: lazyBlock(() => import('../../../packages/blocks/auth/AuthBlock'), 'AuthBlock'),
  sidebar: lazyBlock(
    () => import('../../../packages/blocks/sidebar/SidebarBlock'),
    'SidebarBlock',
  ),
  dashboard: lazyBlock(
    () => import('../../../packages/blocks/dashboard/DashboardBlock'),
    'DashboardBlock',
  ),
  'data-table': lazyBlock(
    () => import('../../../packages/blocks/data-table/DataTableBlock'),
    'DataTableBlock',
  ),
  settings: lazyBlock(
    () => import('../../../packages/blocks/settings/SettingsBlock'),
    'SettingsBlock',
  ),
  pricing: lazyBlock(
    () => import('../../../packages/blocks/pricing/PricingBlock'),
    'PricingBlock',
  ),
  hero: lazyBlock(() => import('../../../packages/blocks/hero/HeroBlock'), 'HeroBlock'),
  feed: lazyBlock(() => import('../../../packages/blocks/feed/FeedBlock'), 'FeedBlock'),
  'app-shell': lazyBlock(
    () => import('../../../packages/blocks/app-shell/AppShellBlock'),
    'AppShellBlock',
  ),
  'empty-state': lazyBlock(
    () => import('../../../packages/blocks/empty-state/EmptyStateBlock'),
    'EmptyStateBlock',
  ),
}

interface ErrorBoundaryProps {
  fallback: ReactNode
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class BlockErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

interface BlockPreviewProps {
  name: string
  slug: string
  description?: string
  code?: string
  variants?: string[]
  defaultVariant?: string
}

function PreviewSkeleton() {
  return (
    <div
      style={{
        height: 400,
        background: 'var(--stl-surface1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: '2px solid var(--stl-colorSubtitle)',
            borderTopColor: 'transparent',
            animation: 'spin 1s linear infinite',
          }}
        />
        <p style={{ fontSize: 12, color: 'var(--stl-colorSubtitle)' }}>Loading preview...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function CodeFallback({ code, name }: { code?: string; name: string }) {
  return (
    <div
      style={{
        background: 'var(--stl-surface1)',
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 300,
        gap: 16,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 8,
          background: 'var(--stl-surface2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          style={{ width: 32, height: 32, color: 'var(--stl-colorSubtitle)' }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
          />
        </svg>
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--stl-colorSubtitle)' }}>{name}</p>
        <p style={{ fontSize: 12, color: 'var(--stl-placeholderColor)', marginTop: 4 }}>
          {code
            ? 'Preview unavailable — see code example below'
            : 'Preview not available for this block'}
        </p>
      </div>
    </div>
  )
}

// --- Default preview data for sidebar blocks ---

function HouseIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function FolderIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function GearIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={12} cy={12} r={3} />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx={12} cy={7} r={4} />
    </svg>
  )
}

function LayoutIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
      <line x1={3} y1={9} x2={21} y2={9} />
      <line x1={9} y1={21} x2={9} y2={9} />
    </svg>
  )
}

const defaultSidebarGroups: NavGroup[] = [
  {
    label: 'Main',
    items: [
      { label: 'Home', icon: <HouseIcon />, href: '#', active: true },
      { label: 'Dashboard', icon: <LayoutIcon />, href: '#' },
      { label: 'Projects', icon: <FolderIcon />, href: '#' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'General', icon: <GearIcon />, href: '#' },
      { label: 'Profile', icon: <UserIcon />, href: '#' },
    ],
  },
]

/** Get default props for a block+variant so the preview renders meaningful content */
function getDefaultProps(slug: string, variant: string): Record<string, unknown> {
  const base = { variant }

  switch (slug) {
    case 'auth':
      return base
    case 'sidebar':
      return { ...base, groups: defaultSidebarGroups }
    case 'dashboard':
      return {
        ...base,
        title: 'Dashboard',
        metrics: [
          { title: 'Revenue', value: '$45,231', change: '+20.1%', trend: 'up' },
          { title: 'Users', value: '2,350', change: '+180', trend: 'up' },
          { title: 'Orders', value: '1,234', change: '-3.2%', trend: 'down' },
        ],
      }
    case 'data-table':
      return {
        ...base,
        title: 'Users',
        columns: [
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
          { key: 'role', header: 'Role' },
        ],
        data: [
          { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
          { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
          { name: 'Carol White', email: 'carol@example.com', role: 'Viewer' },
        ],
      }
    case 'settings':
      return {
        ...base,
        user: { name: 'Jane Doe', email: 'jane@example.com' },
      }
    case 'pricing':
      return {
        ...base,
        plans: [
          {
            name: 'Free',
            price: '$0',
            interval: 'month' as const,
            features: ['1 project', '100MB storage'],
            onSelect: () => {},
          },
          {
            name: 'Pro',
            price: '$19',
            interval: 'month' as const,
            features: ['Unlimited projects', '10GB storage', 'Priority support'],
            highlighted: true,
            onSelect: () => {},
          },
          {
            name: 'Enterprise',
            price: '$99',
            interval: 'month' as const,
            features: ['Everything in Pro', 'SSO', 'Dedicated support'],
            onSelect: () => {},
          },
        ],
      }
    case 'hero':
      return {
        ...base,
        title: 'Build faster with blocks',
        description: 'Pre-composed UI patterns for your next project.',
        primaryAction: { label: 'Get Started' },
        secondaryAction: { label: 'Learn More' },
      }
    case 'feed':
      if (variant === 'timeline') {
        return {
          ...base,
          title: 'Activity',
          events: [
            { id: '1', title: 'Project created', date: 'Mar 1', status: 'completed' },
            { id: '2', title: 'First deploy', date: 'Mar 2', status: 'current' },
            { id: '3', title: 'Launch', date: 'Mar 5', status: 'upcoming' },
          ],
        }
      }
      if (variant === 'notifications') {
        return {
          ...base,
          notifications: [
            {
              id: '1',
              title: 'New comment on your post',
              timestamp: '2 min ago',
              read: false,
            },
            {
              id: '2',
              title: 'Build completed',
              description: 'Production deploy succeeded',
              timestamp: '1 hour ago',
              read: true,
            },
          ],
        }
      }
      return {
        ...base,
        comments: [
          {
            id: '1',
            author: { name: 'Alice' },
            text: 'Great work on this!',
            timestamp: '2 hours ago',
            likes: 3,
          },
          {
            id: '2',
            author: { name: 'Bob' },
            text: 'Thanks for the update.',
            timestamp: '1 hour ago',
            likes: 1,
          },
        ],
      }
    case 'app-shell':
      return { ...base, sidebarGroups: defaultSidebarGroups }
    case 'empty-state':
      return base
    default:
      return base
  }
}

function VariantSelector({
  variants,
  activeVariant,
  onChange,
}: {
  variants: string[]
  activeVariant: string
  onChange: (v: string) => void
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 4,
        padding: 4,
        background: 'var(--stl-surface2)',
        borderRadius: 8,
        overflowX: 'auto',
      }}
    >
      {variants.map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          style={{
            padding: '6px 12px',
            fontSize: 12,
            fontWeight: 500,
            borderRadius: 6,
            whiteSpace: 'nowrap',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.15s, color 0.15s',
            ...(v === activeVariant
              ? {
                  background: 'var(--stl-background)',
                  color: 'var(--stl-color)',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }
              : {
                  background: 'transparent',
                  color: 'var(--stl-colorSubtitle)',
                }),
          }}
        >
          {v}
        </button>
      ))}
    </div>
  )
}

export function BlockPreview({
  name,
  slug,
  code,
  variants,
  defaultVariant,
}: BlockPreviewProps) {
  const [mounted, setMounted] = useState(false)
  const [activeVariant, setActiveVariant] = useState(
    defaultVariant ?? variants?.[0] ?? '',
  )
  useEffect(() => setMounted(true), [])

  const BlockComponent = blockComponents[slug]

  const containerStyle = {
    border: '1px solid var(--stl-borderColor)',
    borderRadius: 8,
    overflow: 'hidden' as const,
  }

  if (!BlockComponent || !mounted) {
    return (
      <div style={containerStyle}>
        {!BlockComponent ? <CodeFallback code={code} name={name} /> : <PreviewSkeleton />}
      </div>
    )
  }

  const props = getDefaultProps(slug, activeVariant)

  return (
    <div style={containerStyle}>
      {variants && variants.length > 1 && (
        <div
          style={{
            borderBottom: '1px solid var(--stl-borderColor)',
            padding: '12px 16px',
          }}
        >
          <VariantSelector
            variants={variants}
            activeVariant={activeVariant}
            onChange={setActiveVariant}
          />
        </div>
      )}
      <BlockErrorBoundary fallback={<CodeFallback code={code} name={name} />}>
        <Suspense fallback={<PreviewSkeleton />}>
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              background: 'var(--stl-background)',
              height: 400,
            }}
          >
            <div
              style={{
                transform: 'scale(0.5)',
                transformOrigin: 'top left',
                width: '200%',
                height: '200%',
                pointerEvents: 'none',
              }}
            >
              <BlockComponent {...props} />
            </div>
          </div>
        </Suspense>
      </BlockErrorBoundary>
    </div>
  )
}
