'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const _pathname = usePathname()

  // Extract headings from the main content area on mount and pathname change
  useEffect(() => {
    const content = document.querySelector('[data-content]')
    if (!content) return

    const elements = content.querySelectorAll('h2, h3')
    const items: TocItem[] = []
    elements.forEach((el) => {
      if (!el.id) {
        el.id =
          el.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') || ''
      }
      items.push({
        id: el.id,
        text: el.textContent || '',
        level: el.tagName === 'H2' ? 2 : 3,
      })
    })
    setHeadings(items)
  }, [])

  // Track active heading with IntersectionObserver
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px', threshold: 0 },
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-label="Table of contents" className="space-y-1 text-sm">
      <p className="mb-2 font-medium text-foreground">On this page</p>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })
          }}
          className={`block py-1 transition-colors ${heading.level === 3 ? 'pl-4' : ''} ${
            activeId === heading.id
              ? 'font-medium text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  )
}
