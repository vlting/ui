import type React from 'react'
import type { ComponentType } from 'react'
import { Text, XStack, styled } from 'tamagui'
import { Button, type ButtonProps } from '../Button'

type ButtonVariant = NonNullable<ButtonProps['variant']>
type AnyFC = ComponentType<Record<string, unknown>>

const ButtonJsx = Button as AnyFC
const ButtonTextJsx = Button.Text as AnyFC

// @ts-expect-error Tamagui v2 RC
const PaginationFrame = styled(XStack, {
  alignItems: 'center',
  gap: '$1.5',
  flexWrap: 'nowrap',
})

const PAGE_BUTTON_MIN_WIDTH = { sm: 28, md: 36, lg: 44 } as const

const EllipsisText = styled(Text, {
  fontFamily: '$body',
  color: '$colorSubtitle',

  variants: {
    size: {
      // @ts-expect-error Tamagui v2 RC
      sm: { fontSize: '$2' },
      // @ts-expect-error Tamagui v2 RC
      md: { fontSize: '$3' },
      // @ts-expect-error Tamagui v2 RC
      lg: { fontSize: '$4' },
    },
  } as const,

  defaultVariants: {
    // @ts-expect-error Tamagui v2 RC
    size: 'md',
  },
})

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
  /** Button variant for Previous/Next buttons. Default: 'ghost' */
  navVariant?: ButtonVariant
  /** Button variant for numbered page buttons. Default: 'outline' */
  pageVariant?: ButtonVariant
  /** Button variant for the currently selected page button. Default: 'default' */
  activePageVariant?: ButtonVariant
}

function Root({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  size = 'md',
  navVariant = 'ghost',
  pageVariant = 'outline',
  activePageVariant = 'default',
}: PaginationProps) {
  const pages = computePageRange(currentPage, totalPages, siblingCount)

  return (
    // @ts-expect-error Tamagui v2 RC
    <PaginationFrame role="navigation" aria-label="Pagination">
      <Previous
        disabled={currentPage <= 1}
        onPress={() => onPageChange(currentPage - 1)}
        size={size}
        variant={navVariant}
      />

      {pages.map((page, index) => {
        if (page === null) {
          return <Ellipsis key={`ellipsis-${index}`} size={size} />
        }

        const isActive = page === currentPage
        return (
          <Item
            key={page}
            page={page}
            active={isActive}
            onPress={() => onPageChange(page)}
            size={size}
            variant={isActive ? activePageVariant : pageVariant}
          />
        )
      })}

      <Next
        disabled={currentPage >= totalPages}
        onPress={() => onPageChange(currentPage + 1)}
        size={size}
        variant={navVariant}
      />
    </PaginationFrame>
  )
}

function Previous({
  disabled,
  onPress,
  size = 'md',
  variant = 'ghost',
  children,
}: {
  disabled?: boolean
  onPress?: () => void
  size?: 'sm' | 'md' | 'lg'
  variant?: ButtonVariant
  children?: React.ReactNode
}) {
  return (
    <ButtonJsx
      variant={variant}
      size={size}
      disabled={disabled}
      onPress={onPress}
      aria-label="Go to previous page"
    >
      {children ?? <ButtonTextJsx>Previous</ButtonTextJsx>}
    </ButtonJsx>
  )
}

function Next({
  disabled,
  onPress,
  size = 'md',
  variant = 'ghost',
  children,
}: {
  disabled?: boolean
  onPress?: () => void
  size?: 'sm' | 'md' | 'lg'
  variant?: ButtonVariant
  children?: React.ReactNode
}) {
  return (
    <ButtonJsx
      variant={variant}
      size={size}
      disabled={disabled}
      onPress={onPress}
      aria-label="Go to next page"
    >
      {children ?? <ButtonTextJsx>Next</ButtonTextJsx>}
    </ButtonJsx>
  )
}

function Item({
  page,
  active,
  onPress,
  size = 'md',
  variant,
}: {
  page: number
  active?: boolean
  onPress?: () => void
  size?: 'sm' | 'md' | 'lg'
  variant?: ButtonVariant
}) {
  const resolvedVariant = variant ?? (active ? 'default' : 'outline')
  return (
    <ButtonJsx
      variant={resolvedVariant}
      size={size}
      onPress={onPress}
      aria-label={`Page ${page}`}
      aria-current={active ? 'page' : undefined}
      style={{ minWidth: PAGE_BUTTON_MIN_WIDTH[size] }}
    >
      <ButtonTextJsx>{page}</ButtonTextJsx>
    </ButtonJsx>
  )
}

function Ellipsis({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  return (
    // @ts-expect-error Tamagui v2 RC
    <XStack
      alignItems="center"
      justifyContent="center"
      style={{ minWidth: PAGE_BUTTON_MIN_WIDTH[size] }}
    >
      {/* @ts-expect-error Tamagui v2 RC */}
      <EllipsisText size={size} aria-hidden>
        ...
      </EllipsisText>
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
