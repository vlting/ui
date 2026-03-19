'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { styled } from '../../../packages/stl-react/src'

interface TocItem {
  id: string
  text: string
  level: number
}

const TocNav = styled('nav', { stl: {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  fontSize: '$p',
}})

const TocTitle = styled('p', { stl: {
  mb: '$12',
  fontWeight: '$500',
  color: '$neutral12',
}})

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const _pathname = usePathname()

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
    <TocNav aria-label="Table of contents">
      <TocTitle>On this page</TocTitle>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })
          }}
          style={{
            display: 'block',
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: heading.level === 3 ? 16 : 0,
            transition: 'color 150ms',
            fontWeight: activeId === heading.id ? 500 : 400,
            color: activeId === heading.id
              ? 'var(--stl-primary9, #2270c2)'
              : 'var(--stl-colorSubtitle, #888)',
            textDecoration: 'none',
            fontSize: 14,
          }}
        >
          {heading.text}
        </a>
      ))}
    </TocNav>
  )
}
