'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigation, type NavSection } from '@/lib/navigation'

function SidebarSection({ section }: { section: NavSection }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-2 py-1 text-sm font-semibold text-gray-900 dark:text-gray-100"
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
                      ? 'bg-gray-100 font-medium text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-100'
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
  const pathname = usePathname()

  // Save scroll position before pathname changes trigger re-render
  useEffect(() => {
    savedScrollRef.current = scrollRef.current?.scrollTop ?? 0
  })

  // Restore scroll position after navigation
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = savedScrollRef.current
    }
  }, [pathname])

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
