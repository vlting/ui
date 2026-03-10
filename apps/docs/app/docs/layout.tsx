'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DocsSidebar } from '@/components/docs-sidebar'
import { TableOfContents } from '@/components/table-of-contents'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const _pathname = usePathname()

  // Close sidebar on navigation
  useEffect(() => {
    setSidebarOpen(false)
  }, [])

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background shadow-lg md:hidden"
        aria-label="Open navigation"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="presentation"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          <div
            className="fixed inset-y-0 left-0 w-72 bg-background shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-14 items-center justify-between border-b border-border px-4">
              <span className="text-sm font-semibold">Navigation</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent"
                aria-label="Close navigation"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <DocsSidebar />
          </div>
        </div>
      )}

      {/* Desktop sidebar — sticky */}
      <div className="hidden w-64 shrink-0 border-r border-border md:block sticky top-14 h-[calc(100vh-3.5rem)]">
        <DocsSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 overflow-auto px-6 py-8 lg:px-8" data-content>
        {children}
      </div>

      {/* Right-side table of contents — sticky, hidden below xl */}
      <div className="hidden xl:block w-52 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-l border-border py-8 px-4">
        <TableOfContents />
      </div>
    </div>
  )
}
