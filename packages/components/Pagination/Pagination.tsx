import React from 'react'
import { Text, XStack, styled } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
const PaginationFrame = styled(XStack, {
  alignItems: 'center',
  gap: '$1.5',
  flexWrap: 'wrap',
})

// @ts-expect-error Tamagui v2 RC
const PageButton = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$3',
  cursor: 'pointer',
  borderWidth: 1,
  borderColor: '$borderColor',
  backgroundColor: 'transparent',

  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },

  focusStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },

  pressStyle: {
    opacity: 0.85,
    scale: 0.98,
  },

  animation: 'fast',

  variants: {
    active: {
      true: {
        backgroundColor: '$color10',
        borderColor: '$color10',
        hoverStyle: {
          backgroundColor: '$color11',
        },
      },
    },

    isDisabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },

    size: {
      sm: {
        width: '$3',
        height: '$3',
      },
      md: {
        width: '$3.5',
        height: '$3.5',
      },
      lg: {
        width: '$4.5',
        height: '$4.5',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const PageButtonText = styled(Text, {
  fontFamily: '$body',
  fontWeight: '$3',

  variants: {
    active: {
      true: { color: '$color1' },
      false: { color: '$color' },
    },
    size: {
      sm: { fontSize: '$2' },
      md: { fontSize: '$3' },
      lg: { fontSize: '$4' },
    },
  } as const,

  defaultVariants: {
    active: false,
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const NavButton = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$3',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: '$borderColor',

  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },

  focusStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },

  pressStyle: {
    opacity: 0.85,
    scale: 0.98,
  },

  animation: 'fast',

  variants: {
    isDisabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },

    size: {
      sm: {
        paddingVertical: '$1',
        paddingHorizontal: '$2',
        height: '$3',
      },
      md: {
        paddingVertical: '$1.5',
        paddingHorizontal: '$3',
        height: '$3.5',
      },
      lg: {
        paddingVertical: '$2',
        paddingHorizontal: '$4',
        height: '$4.5',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const NavButtonText = styled(Text, {
  fontFamily: '$body',
  fontWeight: '$3',
  color: '$color',

  variants: {
    size: {
      sm: { fontSize: '$2' },
      md: { fontSize: '$3' },
      lg: { fontSize: '$4' },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const EllipsisText = styled(Text, {
  fontFamily: '$body',
  color: '$colorSubtitle',

  variants: {
    size: {
      sm: { fontSize: '$2' },
      md: { fontSize: '$3' },
      lg: { fontSize: '$4' },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

const buttonReset: React.CSSProperties = {
  all: 'unset',
  display: 'inline-flex',
}

/**
 * Compute which page numbers to display, inserting null for ellipsis gaps.
 */
function computePageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): (number | null)[] {
  const totalNumbers = siblingCount * 2 + 5 // siblings + first + last + current + 2 ellipses
  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(currentPage - siblingCount, 2)
  const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1)

  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < totalPages - 1

  const pages: (number | null)[] = [1]

  if (showLeftEllipsis) {
    pages.push(null)
  } else {
    for (let i = 2; i < leftSibling; i++) {
      pages.push(i)
    }
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    pages.push(i)
  }

  if (showRightEllipsis) {
    pages.push(null)
  } else {
    for (let i = rightSibling + 1; i < totalPages; i++) {
      pages.push(i)
    }
  }

  pages.push(totalPages)
  return pages
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
  size?: 'sm' | 'md' | 'lg'
}

function Root({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  size = 'md',
}: PaginationProps) {
  const pages = computePageRange(currentPage, totalPages, siblingCount)

  return (
    // @ts-expect-error Tamagui v2 RC
    <PaginationFrame role="navigation" aria-label="Pagination">
      <button
        style={buttonReset}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Go to previous page"
      >
        {/* @ts-expect-error Tamagui v2 RC */}
        <NavButton isDisabled={currentPage <= 1} size={size}>
          {/* @ts-expect-error Tamagui v2 RC */}
          <NavButtonText size={size}>Previous</NavButtonText>
        </NavButton>
      </button>

      {pages.map((page, index) => {
        if (page === null) {
          return (
            <Ellipsis key={`ellipsis-${index}`} size={size} />
          )
        }

        const isActive = page === currentPage
        return (
          <button
            key={page}
            style={buttonReset}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {/* @ts-expect-error Tamagui v2 RC */}
            <PageButton active={isActive} size={size}>
              {/* @ts-expect-error Tamagui v2 RC */}
              <PageButtonText active={isActive} size={size}>
                {page}
              </PageButtonText>
            </PageButton>
          </button>
        )
      })}

      <button
        style={buttonReset}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Go to next page"
      >
        {/* @ts-expect-error Tamagui v2 RC */}
        <NavButton isDisabled={currentPage >= totalPages} size={size}>
          {/* @ts-expect-error Tamagui v2 RC */}
          <NavButtonText size={size}>Next</NavButtonText>
        </NavButton>
      </button>
    </PaginationFrame>
  )
}

function Previous({
  disabled,
  onPress,
  size = 'md',
  children,
}: {
  disabled?: boolean
  onPress?: () => void
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
}) {
  return (
    <button
      style={buttonReset}
      onClick={onPress}
      disabled={disabled}
      aria-label="Go to previous page"
    >
      {/* @ts-expect-error Tamagui v2 RC */}
      <NavButton isDisabled={disabled} size={size}>
        {children ?? (
          // @ts-expect-error Tamagui v2 RC
          <NavButtonText size={size}>Previous</NavButtonText>
        )}
      </NavButton>
    </button>
  )
}

function Next({
  disabled,
  onPress,
  size = 'md',
  children,
}: {
  disabled?: boolean
  onPress?: () => void
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
}) {
  return (
    <button
      style={buttonReset}
      onClick={onPress}
      disabled={disabled}
      aria-label="Go to next page"
    >
      {/* @ts-expect-error Tamagui v2 RC */}
      <NavButton isDisabled={disabled} size={size}>
        {children ?? (
          // @ts-expect-error Tamagui v2 RC
          <NavButtonText size={size}>Next</NavButtonText>
        )}
      </NavButton>
    </button>
  )
}

function Item({
  page,
  active,
  onPress,
  size = 'md',
}: {
  page: number
  active?: boolean
  onPress?: () => void
  size?: 'sm' | 'md' | 'lg'
}) {
  return (
    <button
      style={buttonReset}
      onClick={onPress}
      aria-label={`Page ${page}`}
      aria-current={active ? 'page' : undefined}
    >
      {/* @ts-expect-error Tamagui v2 RC */}
      <PageButton active={active} size={size}>
        {/* @ts-expect-error Tamagui v2 RC */}
        <PageButtonText active={active} size={size}>
          {page}
        </PageButtonText>
      </PageButton>
    </button>
  )
}

function Ellipsis({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  return (
    <XStack
      alignItems="center"
      justifyContent="center"
      width={size === 'sm' ? '$2' : size === 'lg' ? '$4' : '$3'}
      height={size === 'sm' ? '$3' : size === 'lg' ? '$4.5' : '$3.5'}
    >
      {/* @ts-expect-error Tamagui v2 RC */}
      <EllipsisText size={size} aria-hidden>...</EllipsisText>
    </XStack>
  )
}

export const Pagination = {
  Root,
  Previous,
  Next,
  Item,
  Ellipsis,
}
