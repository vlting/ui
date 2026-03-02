'use client'

import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useState,
  type ComponentType,
  type ReactNode,
} from 'react'

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
  'login-01': lazyBlock(() => import('../../../packages/blocks/login/Login01'), 'Login01'),
  'login-02': lazyBlock(() => import('../../../packages/blocks/login/Login02'), 'Login02'),
  'login-03': lazyBlock(() => import('../../../packages/blocks/login/Login03'), 'Login03'),
  'login-04': lazyBlock(() => import('../../../packages/blocks/login/Login04'), 'Login04'),
  'login-05': lazyBlock(() => import('../../../packages/blocks/login/Login05'), 'Login05'),
  'signup-01': lazyBlock(() => import('../../../packages/blocks/signup/Signup01'), 'Signup01'),
  'signup-02': lazyBlock(() => import('../../../packages/blocks/signup/Signup02'), 'Signup02'),
  'signup-03': lazyBlock(() => import('../../../packages/blocks/signup/Signup03'), 'Signup03'),
  'signup-04': lazyBlock(() => import('../../../packages/blocks/signup/Signup04'), 'Signup04'),
  'signup-05': lazyBlock(() => import('../../../packages/blocks/signup/Signup05'), 'Signup05'),
  'sidebar-01': lazyBlock(() => import('../../../packages/blocks/sidebar/Sidebar01'), 'Sidebar01'),
  'sidebar-02': lazyBlock(() => import('../../../packages/blocks/sidebar/Sidebar02'), 'Sidebar02'),
  'sidebar-03': lazyBlock(() => import('../../../packages/blocks/sidebar/Sidebar03'), 'Sidebar03'),
  'sidebar-04': lazyBlock(() => import('../../../packages/blocks/sidebar/Sidebar04'), 'Sidebar04'),
  'sidebar-05': lazyBlock(() => import('../../../packages/blocks/sidebar/Sidebar05'), 'Sidebar05'),
  'sidebar-06': lazyBlock(() => import('../../../packages/blocks/sidebar/Sidebar06'), 'Sidebar06'),
  'sidebar-07': lazyBlock(() => import('../../../packages/blocks/sidebar/Sidebar07'), 'Sidebar07'),
  'sidebar-08': lazyBlock(() => import('../../../packages/blocks/sidebar/Sidebar08'), 'Sidebar08'),
  'sidebar-09': lazyBlock(() => import('../../../packages/blocks/sidebar/Sidebar09'), 'Sidebar09'),
  'sidebar-10': lazyBlock(() => import('../../../packages/blocks/sidebar/Sidebar10'), 'Sidebar10'),
  'sidebar-11': lazyBlock(() => import('../../../packages/blocks/sidebar/Sidebar11'), 'Sidebar11'),
  'sidebar-12': lazyBlock(() => import('../../../packages/blocks/sidebar/Sidebar12'), 'Sidebar12'),
  'sidebar-13': lazyBlock(() => import('../../../packages/blocks/sidebar/Sidebar13'), 'Sidebar13'),
  'sidebar-14': lazyBlock(() => import('../../../packages/blocks/sidebar/Sidebar14'), 'Sidebar14'),
  'sidebar-15': lazyBlock(() => import('../../../packages/blocks/sidebar/Sidebar15'), 'Sidebar15'),
  'sidebar-16': lazyBlock(() => import('../../../packages/blocks/sidebar/Sidebar16'), 'Sidebar16'),
  'dashboard-01': lazyBlock(() => import('../../../packages/blocks/dashboard/Dashboard01'), 'Dashboard01'),
  'mobile-tab-layout': lazyBlock(() => import('../../../packages/blocks/originals/MobileTabLayout'), 'MobileTabLayout'),
  'master-detail': lazyBlock(() => import('../../../packages/blocks/originals/MasterDetail'), 'MasterDetail'),
  'app-shell-responsive': lazyBlock(() => import('../../../packages/blocks/originals/AppShellResponsive'), 'AppShellResponsive'),
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
}

function PreviewSkeleton() {
  return (
    <div className="bg-surface-muted flex items-center justify-center" style={{ height: 400 }}>
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
        <p className="text-xs text-muted-foreground">Loading preview...</p>
      </div>
    </div>
  )
}

function CodeFallback({ code, name }: { code?: string; name: string }) {
  return (
    <div className="bg-surface-muted p-8 flex flex-col items-center justify-center min-h-[300px] gap-4">
      <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
        <svg
          className="w-8 h-8 text-muted-foreground"
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
      <div className="text-center">
        <p className="text-sm font-medium text-foreground-secondary">{name}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {code ? 'Preview unavailable — see code example below' : 'Preview not available for this block'}
        </p>
      </div>
    </div>
  )
}

export function BlockPreview({ name, slug, code }: BlockPreviewProps) {
  // Client-only rendering gate — avoids SSR hydration mismatches with Tamagui
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const BlockComponent = blockComponents[slug]

  if (!BlockComponent || !mounted) {
    return (
      <div className="border border-border rounded-lg overflow-hidden">
        {!BlockComponent ? (
          <CodeFallback code={code} name={name} />
        ) : (
          <PreviewSkeleton />
        )}
      </div>
    )
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <BlockErrorBoundary fallback={<CodeFallback code={code} name={name} />}>
        <Suspense fallback={<PreviewSkeleton />}>
          <div
            className="relative overflow-hidden bg-background"
            style={{ height: 400 }}
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
              <BlockComponent />
            </div>
          </div>
        </Suspense>
      </BlockErrorBoundary>
    </div>
  )
}
