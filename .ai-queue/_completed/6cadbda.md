# Commit History
- `4439634` feat(docs-site): add sticky nav, scroll persistence, right-side TOC, 3-column layout
- `6cadbda` merge commit into fix/docs-site/nav-layout-fixes

<!-- auto-queue -->
<!-- target-branch: fix/docs-site/nav-layout-fixes -->

# Navigation Overhaul (Left Nav Sticky + Scroll Fix + Right TOC + Layout)

Stage 6 of Documentation Site epic (#72). Fix left nav stickiness and scroll preservation, add right-side table of contents, and update the docs layout to a 3-column design.

## Scope
- `examples/docs/components/docs-sidebar.tsx`
- `examples/docs/app/docs/layout.tsx`
- NEW `examples/docs/components/table-of-contents.tsx`

## Instructions

### 1. Make Left Nav Sticky (`docs-sidebar.tsx`)

The sidebar currently scrolls with the page. Make it sticky so it stays visible while the user scrolls main content.

- The `<aside>` element should use: `position: sticky; top: <header-height>; height: calc(100vh - <header-height>); overflow-y: auto;`
- The site header is sticky at the top with height ~56px (check `site-header.tsx` for exact value). Use `top: 3.5rem` or similar.
- The sidebar already has `overflow-y-auto` — keep that. Add `sticky top-14 h-[calc(100vh-3.5rem)]` (adjust based on actual header height).

### 2. Fix Left Nav Scroll Position on Navigation (`docs-sidebar.tsx`)

When clicking a nav link to navigate to a different page, the left nav scrolls back to the top. Fix this:

- Use a `useRef` on the sidebar's scrollable container.
- On pathname change (from `usePathname()`), save the current scroll position before the navigation renders.
- After the navigation completes, restore the scroll position.
- Pattern: use `useEffect` with pathname dependency — but save scrollTop in a ref that persists across re-renders. On first render after pathname change, restore from the ref.
- Alternative simpler approach: wrap the sidebar `<aside>` in a component that does NOT re-render on route change. Since the sidebar is in the docs layout (not the page), it should already persist — the issue may be that the layout is re-mounting. Investigate and fix accordingly.

### 3. Create Right-Side Table of Contents (`table-of-contents.tsx`)

Create a new component `examples/docs/components/table-of-contents.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number  // 2 for h2, 3 for h3
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  // Extract headings from the main content area on mount and pathname change
  useEffect(() => {
    const content = document.querySelector('[data-content]') // or main content selector
    if (!content) return

    const elements = content.querySelectorAll('h2, h3')
    const items: TocItem[] = []
    elements.forEach((el) => {
      // Ensure headings have IDs for linking
      if (!el.id) {
        el.id = el.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ''
      }
      items.push({
        id: el.id,
        text: el.textContent || '',
        level: el.tagName === 'H2' ? 2 : 3,
      })
    })
    setHeadings(items)
  }, [/* pathname dependency */])

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
      { rootMargin: '-80px 0px -80% 0px', threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="space-y-1 text-sm">
      <p className="font-medium text-gray-900 dark:text-gray-100 mb-2">On this page</p>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })
          }}
          className={`block py-1 transition-colors ${
            heading.level === 3 ? 'pl-4' : ''
          } ${
            activeId === heading.id
              ? 'text-blue-600 dark:text-blue-400 font-medium'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  )
}
```

Key requirements:
- Must be a client component (`'use client'`)
- Uses `usePathname()` to re-extract headings when route changes
- IntersectionObserver tracks which heading is currently visible
- Smooth scroll on click
- h3 items indented under h2 items
- Hidden on mobile (handled by layout)
- Styled with Tailwind, matching the docs site design

### 4. Update Docs Layout (`app/docs/layout.tsx`)

Update the layout to be a 3-column design:

```
┌─────────────────────────────────────────────────────────┐
│ Site Header (sticky, full width)                        │
├──────────┬──────────────────────────┬───────────────────┤
│ Sidebar  │ Main Content             │ Table of Contents │
│ (sticky) │ (scrollable, flex-1)     │ (sticky, hidden   │
│ 264px    │                          │ on mobile, ~200px)│
└──────────┴──────────────────────────┴───────────────────┘
```

- Import `TableOfContents` from `../components/table-of-contents`
- Wrap the layout in a flex container: `flex flex-row`
- Left sidebar: fixed width (264px or w-66), sticky
- Main content: `flex-1 min-w-0 overflow-auto`
- Right TOC: `hidden xl:block w-52 shrink-0` with sticky positioning
- Add `data-content` attribute to the main content wrapper so the TOC can find headings
- Keep the existing mobile sidebar toggle functionality

## Verification
- Left nav stays visible while scrolling page content (sticky)
- Left nav scroll position is preserved when navigating between pages
- Right nav appears on xl+ screens showing h2/h3 headings
- Right nav highlights the currently visible section
- Clicking a right nav item smooth-scrolls to that section
- Right nav is hidden on mobile/tablet
- Layout is responsive and doesn't break on smaller screens

## Task Progress
<!-- lat: 2026-03-02T13:57:00Z -->
<!-- agent-pid: 69683 -->
<!-- worktree: .worktrees/q-001 -->
<!-- branch: q/001 -->

### Checklist
- [x] Create worktree from target branch
- [x] Make left nav sticky (docs-sidebar.tsx)
- [x] Fix left nav scroll position on navigation (docs-sidebar.tsx)
- [x] Create right-side table of contents (table-of-contents.tsx)
- [x] Update docs layout to 3-column design (layout.tsx)
- [ ] **ACTIVE** → Verify build passes
- [ ] Merge and archive

### Handoff Context
- Target branch: fix/docs-site/nav-layout-fixes
- Scope: docs-sidebar.tsx, layout.tsx, new table-of-contents.tsx
