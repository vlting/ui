'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { type NavSection, navigation } from '@/lib/navigation'

function SidebarSection({ section }: { section: NavSection }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-2 py-1 text-sm font-semibold text-foreground"
        aria-expanded={isOpen}
      >
        {section.title}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      {isOpen && (
        <ul className="mt-1 space-y-0.5">
          {section.items.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-md px-2 py-1 text-sm transition-colors ${
                    isActive
                      ? 'bg-accent font-medium text-foreground'
                      : 'text-foreground-secondary hover:bg-accent hover:text-foreground'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export function DocsSidebar() {
  const scrollRef = useRef<HTMLElement>(null)
  const savedScrollRef = useRef(0)
  const _pathname = usePathname()

  // Save scroll position before pathname changes trigger re-render
  useEffect(() => {
    savedScrollRef.current = scrollRef.current?.scrollTop ?? 0
  })

  // Restore scroll position after navigation
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = savedScrollRef.current
    }
  }, [])

  return (
    <aside ref={scrollRef} className="h-full overflow-y-auto px-2 py-4">
      <nav aria-label="Documentation">
        {navigation.map((section) => (
          <SidebarSection key={section.title} section={section} />
        ))}
      </nav>
    </aside>
  )
}
