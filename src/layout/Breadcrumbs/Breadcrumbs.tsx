import React, { memo, useCallback, useState } from 'react'
import { Text, XStack, styled } from 'tamagui'

// ─── Types ────────────────────────────────────────────────────────────────────

export type BreadcrumbItem = {
  label: string
  href?: string
  onPress?: () => void
}

export type BreadcrumbsProps = {
  /** Ordered list of breadcrumb items; last item is current page */
  items: BreadcrumbItem[]
  /** Separator character between items */
  separator?: string
  /** Max items to show before collapsing to ellipsis (0 = never) */
  maxItems?: number
  /** Accessible label for the nav landmark */
  accessibilityLabel?: string
  testID?: string
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const BreadcrumbLink = styled(Text, {
  color: '$color',
  fontSize: '$2',
  cursor: 'pointer',
  textDecorationLine: 'none',

  hoverStyle: {
    textDecorationLine: 'underline',
    color: '$colorHover',
  },

  focusStyle: {
    outlineColor: '$outlineColor',
    outlineWidth: 2,
    outlineStyle: 'solid',
  },
})

const BreadcrumbCurrent = styled(Text, {
  color: '$colorSubtitle',
  fontSize: '$2',
  fontWeight: '500',
})

const BreadcrumbSeparator = styled(Text, {
  color: '$colorSubtitle',
  fontSize: '$2',
  marginHorizontal: '$1',
})

// ─── Component ────────────────────────────────────────────────────────────────

export const Breadcrumbs = memo(function Breadcrumbs({
  items,
  separator = '/',
  maxItems = 0,
  accessibilityLabel = 'Breadcrumb',
  testID,
}: BreadcrumbsProps) {
  const [expanded, setExpanded] = useState(false)

  const shouldCollapse =
    maxItems > 0 && items.length > maxItems && !expanded

  const visibleItems: Array<BreadcrumbItem | 'ellipsis'> = shouldCollapse
    ? [
        items[0],
        'ellipsis',
        ...items.slice(items.length - Math.max(1, maxItems - 2)),
      ]
    : items

  return (
    <nav aria-label={accessibilityLabel} data-testid={testID}>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1
          const isFirst = index === 0

          if (item === 'ellipsis') {
            return (
              <li key="ellipsis" style={{ display: 'flex', alignItems: 'center' }}>
                {!isFirst && (
                  <BreadcrumbSeparator aria-hidden="true">{separator}</BreadcrumbSeparator>
                )}
                <button
                  aria-label="Show hidden breadcrumb items"
                  onClick={() => setExpanded(true)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px' }}
                  data-testid="breadcrumbs-ellipsis"
                >
                  <BreadcrumbCurrent>…</BreadcrumbCurrent>
                </button>
              </li>
            )
          }

          const isCurrentPage = isLast
          return (
            <li key={`${item.label}-${index}`} style={{ display: 'flex', alignItems: 'center' }}>
              {index > 0 && (
                <BreadcrumbSeparator aria-hidden="true">{separator}</BreadcrumbSeparator>
              )}
              {isCurrentPage ? (
                <BreadcrumbCurrent aria-current="page" testID={`breadcrumb-current`}>
                  {item.label}
                </BreadcrumbCurrent>
              ) : item.href ? (
                <a
                  href={item.href}
                  style={{ textDecoration: 'none' }}
                  data-testid={`breadcrumb-link-${index}`}
                >
                  <BreadcrumbLink>{item.label}</BreadcrumbLink>
                </a>
              ) : (
                <BreadcrumbLink
                  accessible
                  accessibilityRole="button"
                  onPress={item.onPress}
                  testID={`breadcrumb-link-${index}`}
                >
                  {item.label}
                </BreadcrumbLink>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
})
