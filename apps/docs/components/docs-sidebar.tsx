'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { styled } from '../../../packages/stl-react/src'
import { type NavSection, navigation } from '@/lib/navigation'

const SectionContainer = styled('div', { stl: {
  mb: '$3.5',
}})

const SectionButton = styled('button', { stl: {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  px: '$1.5',
  py: '$0.75',
  fontSize: '$p',
  fontWeight: '$600',
  color: '$neutral12',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
}})

const ItemList = styled('ul', { stl: {
  mt: '$0.75',
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}})

const SidebarAside = styled('aside', { stl: {
  height: '100%',
  overflowY: 'auto',
  px: '$1.5',
  py: '$3.5',
}})

function SidebarSection({ section }: { section: NavSection }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <SectionContainer>
      <SectionButton
        onClick={() => setIsOpen(!isOpen)}
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
          style={{
            transition: 'transform 150ms',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </SectionButton>
      {isOpen && (
        <ItemList>
          {section.items.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    display: 'block',
                    borderRadius: 6,
                    padding: '4px 8px',
                    fontSize: 14,
                    transition: 'color 150ms, background 150ms',
                    backgroundColor: isActive ? 'var(--stl-background2, #f0f0f0)' : 'transparent',
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? 'var(--stl-color, #111)' : 'var(--stl-colorSubtitle, #666)',
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ItemList>
      )}
    </SectionContainer>
  )
}

export function DocsSidebar() {
  const scrollRef = useRef<HTMLElement>(null)
  const savedScrollRef = useRef(0)
  const _pathname = usePathname()

  useEffect(() => {
    savedScrollRef.current = scrollRef.current?.scrollTop ?? 0
  })

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = savedScrollRef.current
    }
  }, [])

  return (
    <SidebarAside ref={scrollRef as any}>
      <nav aria-label="Documentation">
        {navigation.map((section) => (
          <SidebarSection key={section.title} section={section} />
        ))}
      </nav>
    </SidebarAside>
  )
}
