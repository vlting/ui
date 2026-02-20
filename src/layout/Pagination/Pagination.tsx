import React, { memo, useCallback, useState } from 'react'
import { Text, XStack, styled } from 'tamagui'

// ─── Page button ──────────────────────────────────────────────────────────────

const PageButton = styled(XStack, {
  minWidth: 36,
  height: 36,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: '$2',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$2',
  cursor: 'pointer',

  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },

  focusStyle: {
    outlineColor: '$outlineColor',
    outlineWidth: 2,
    outlineStyle: 'solid',
  },

  variants: {
    active: {
      true: {
        backgroundColor: '$color',
        borderColor: '$color',
      },
    },
    disabled: {
      true: {
        opacity: 0.4,
        pointerEvents: 'none',
        cursor: 'not-allowed',
      },
    },
  } as const,
})

// ─── Helper: build page window ────────────────────────────────────────────────

function buildPageWindow(page: number, totalPages: number, windowSize = 5): Array<number | 'ellipsis'> {
  if (totalPages <= windowSize + 2) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const half = Math.floor(windowSize / 2)
  let start = Math.max(2, page - half)
  let end = Math.min(totalPages - 1, page + half)

  if (end - start < windowSize - 1) {
    if (start === 2) end = Math.min(totalPages - 1, start + windowSize - 1)
    else start = Math.max(2, end - windowSize + 1)
  }

  const result: Array<number | 'ellipsis'> = [1]
  if (start > 2) result.push('ellipsis')
  for (let i = start; i <= end; i++) result.push(i)
  if (end < totalPages - 1) result.push('ellipsis')
  if (totalPages > 1) result.push(totalPages)
  return result
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type PaginationProps = {
  /** Current page (1-based, controlled) */
  page?: number
  /** Default page for uncontrolled mode */
  defaultPage?: number
  /** Total number of pages */
  totalPages: number
  /** Callback when page changes */
  onPageChange?: (page: number) => void
  /** Accessible label for the navigation */
  accessibilityLabel?: string
  testID?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Pagination = memo(function Pagination({
  page: pageProp,
  defaultPage = 1,
  totalPages,
  onPageChange,
  accessibilityLabel = 'Pagination',
  testID,
}: PaginationProps) {
  const isControlled = pageProp !== undefined
  const [internalPage, setInternalPage] = useState(defaultPage)
  const currentPage = isControlled ? (pageProp ?? 1) : internalPage

  const handlePageChange = useCallback(
    (p: number) => {
      if (p < 1 || p > totalPages) return
      if (!isControlled) setInternalPage(p)
      onPageChange?.(p)
    },
    [isControlled, onPageChange, totalPages],
  )

  const pages = buildPageWindow(currentPage, totalPages)

  return (
    <nav
      aria-label={accessibilityLabel}
      data-testid={testID}
    >
      <XStack gap="$1" alignItems="center">
        {/* Previous */}
        <PageButton
          accessible
          accessibilityRole="button"
          aria-label="Previous page"
          aria-disabled={currentPage <= 1}
          disabled={currentPage <= 1}
          onPress={() => handlePageChange(currentPage - 1)}
          testID="pagination-prev"
        >
          <Text color={currentPage <= 1 ? '$colorSubtitle' : '$color'} fontSize="$3">
            ‹
          </Text>
        </PageButton>

        {/* Pages */}
        {pages.map((p, i) =>
          p === 'ellipsis' ? (
            <Text
              key={`ellipsis-${i}`}
              aria-hidden="true"
              color="$colorSubtitle"
              paddingHorizontal="$2"
              testID={`pagination-ellipsis-${i}`}
            >
              …
            </Text>
          ) : (
            <PageButton
              key={p}
              accessible
              accessibilityRole="button"
              active={p === currentPage}
              aria-current={p === currentPage ? 'page' : undefined}
              aria-label={`Page ${p}`}
              onPress={() => handlePageChange(p)}
              testID={`pagination-page-${p}`}
            >
              <Text
                color={p === currentPage ? '$background' : '$color'}
                fontSize="$3"
                fontWeight={p === currentPage ? '600' : '400'}
              >
                {p}
              </Text>
            </PageButton>
          ),
        )}

        {/* Next */}
        <PageButton
          accessible
          accessibilityRole="button"
          aria-label="Next page"
          aria-disabled={currentPage >= totalPages}
          disabled={currentPage >= totalPages}
          onPress={() => handlePageChange(currentPage + 1)}
          testID="pagination-next"
        >
          <Text color={currentPage >= totalPages ? '$colorSubtitle' : '$color'} fontSize="$3">
            ›
          </Text>
        </PageButton>
      </XStack>
    </nav>
  )
})
