import {
  type ReactNode,
  createContext,
  forwardRef,
  useContext,
  useMemo,
} from 'react'
import { Pressable, Text as RNText, View } from 'react-native'
import { useControllableState } from '../../headless/src/useControllableState'
import { styled } from '../../stl-native/src/config'

// ─── Context ────────────────────────────────────────────────────────────────

interface PaginationContextValue {
  page: number | undefined
  totalPages: number | undefined
  setPage: (page: number) => void
}

const PaginationContext = createContext<PaginationContextValue | null>(null)

function usePaginationContext() {
  const ctx = useContext(PaginationContext)
  if (!ctx) {
    throw new Error('Pagination compound components must be used within Pagination.Root')
  }
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledRoot = styled(View, {
}, {}, 'PaginationRoot')

const StyledContent = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
}, {}, 'PaginationContent')

const StyledItem = styled(Pressable, {
  minWidth: 36,
  height: 36,
  borderRadius: 6,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
}, {
  active: {
    true: { backgroundColor: '$primary9' },
  },
  disabled: {
    true: { opacity: 0.5 },
  },
  pressed: {
    true: { backgroundColor: '$neutral4' },
  },
}, 'PaginationItem')

const StyledItemText = styled(RNText, {
  fontSize: 14,
  fontWeight: '500',
  color: '$neutral9',
}, {
  active: {
    true: { color: '$primaryText9' },
  },
}, 'PaginationItemText')

const StyledNavButton = styled(Pressable, {
  minWidth: 36,
  height: 36,
  borderRadius: 6,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
}, {
  disabled: {
    true: { opacity: 0.5 },
  },
  pressed: {
    true: { backgroundColor: '$neutral4' },
  },
}, 'PaginationNavButton')

const StyledNavButtonText = styled(RNText, {
  fontSize: 16,
  color: '$neutral9',
}, {}, 'PaginationNavButtonText')

const StyledEllipsis = styled(View, {
  minWidth: 36,
  height: 36,
  alignItems: 'center',
  justifyContent: 'center',
}, {}, 'PaginationEllipsis')

const StyledEllipsisText = styled(RNText, {
  color: '$neutral6',
  fontSize: 14,
}, {}, 'PaginationEllipsisText')

// ─── Root ───────────────────────────────────────────────────────────────────

export interface PaginationRootProps {
  children?: ReactNode
  page?: number
  defaultPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  accessibilityLabel?: string
}

export type PaginationProps = PaginationRootProps

const PaginationRoot = forwardRef<View, PaginationRootProps>(
  ({ page: pageProp, defaultPage = 1, totalPages, onPageChange, children, accessibilityLabel = 'Pagination', ...rest }, ref) => {
    const [page, setPage] = useControllableState({
      prop: pageProp,
      defaultProp: defaultPage,
      onChange: onPageChange,
    })

    const contextValue = useMemo(
      () => ({ page, totalPages, setPage }),
      [page, totalPages, setPage],
    )

    return (
      <PaginationContext.Provider value={contextValue}>
        <StyledRoot
          ref={ref}
          accessibilityRole="navigation"
          accessibilityLabel={accessibilityLabel}
          {...rest}
        >
          {children}
        </StyledRoot>
      </PaginationContext.Provider>
    )
  },
)
PaginationRoot.displayName = 'Pagination.Root'

// ─── Content ────────────────────────────────────────────────────────────────

export interface PaginationContentProps {
  children?: ReactNode
}

const PaginationContent = forwardRef<View, PaginationContentProps>(
  (props, ref) => (
    <StyledContent ref={ref} accessibilityRole="list" {...props} />
  ),
)
PaginationContent.displayName = 'Pagination.Content'

// ─── Item ───────────────────────────────────────────────────────────────────

export interface PaginationItemProps {
  children?: ReactNode
  value: number
  onPress?: () => void
}

const PaginationItem = forwardRef<View, PaginationItemProps>(
  ({ value, onPress, children, ...rest }, ref) => {
    const ctx = usePaginationContext()
    const isActive = ctx.page === value

    return (
      <StyledItem
        ref={ref}
        active={isActive}
        onPress={() => {
          ctx.setPage(value)
          onPress?.()
        }}
        accessibilityRole="button"
        accessibilityLabel={`Page ${value}`}
        accessibilityState={{ selected: isActive }}
        {...rest}
      >
        <StyledItemText active={isActive}>
          {children ?? String(value)}
        </StyledItemText>
      </StyledItem>
    )
  },
)
PaginationItem.displayName = 'Pagination.Item'

// ─── Previous ───────────────────────────────────────────────────────────────

export interface PaginationPreviousProps {
  children?: ReactNode
  onPress?: () => void
  disabled?: boolean
}

const PaginationPrevious = forwardRef<View, PaginationPreviousProps>(
  ({ onPress, disabled: disabledProp, children, ...rest }, ref) => {
    const ctx = usePaginationContext()
    const atStart = ctx.page != null && ctx.page <= 1
    const disabled = disabledProp ?? atStart

    return (
      <StyledNavButton
        ref={ref}
        disabled={disabled}
        onPress={() => {
          if (ctx.page != null && ctx.page > 1) {
            ctx.setPage(ctx.page - 1)
          }
          onPress?.()
        }}
        accessibilityRole="button"
        accessibilityLabel="Previous page"
        accessibilityState={{ disabled }}
        {...rest}
      >
        {children ?? <StyledNavButtonText>{'\u2039'}</StyledNavButtonText>}
      </StyledNavButton>
    )
  },
)
PaginationPrevious.displayName = 'Pagination.Previous'

// ─── Next ───────────────────────────────────────────────────────────────────

export interface PaginationNextProps {
  children?: ReactNode
  onPress?: () => void
  disabled?: boolean
}

const PaginationNext = forwardRef<View, PaginationNextProps>(
  ({ onPress, disabled: disabledProp, children, ...rest }, ref) => {
    const ctx = usePaginationContext()
    const atEnd = ctx.page != null && ctx.totalPages != null && ctx.page >= ctx.totalPages
    const disabled = disabledProp ?? atEnd

    return (
      <StyledNavButton
        ref={ref}
        disabled={disabled}
        onPress={() => {
          if (ctx.page != null) {
            const next = ctx.page + 1
            if (ctx.totalPages == null || next <= ctx.totalPages) {
              ctx.setPage(next)
            }
          }
          onPress?.()
        }}
        accessibilityRole="button"
        accessibilityLabel="Next page"
        accessibilityState={{ disabled }}
        {...rest}
      >
        {children ?? <StyledNavButtonText>{'\u203A'}</StyledNavButtonText>}
      </StyledNavButton>
    )
  },
)
PaginationNext.displayName = 'Pagination.Next'

// ─── Ellipsis ───────────────────────────────────────────────────────────────

export interface PaginationEllipsisProps {
  children?: ReactNode
}

const PaginationEllipsis = forwardRef<View, PaginationEllipsisProps>(
  ({ children, ...rest }, ref) => (
    <StyledEllipsis
      ref={ref}
      accessibilityElementsHidden
      importantForAccessibility="no"
      {...rest}
    >
      <StyledEllipsisText>{children ?? '\u2026'}</StyledEllipsisText>
    </StyledEllipsis>
  ),
)
PaginationEllipsis.displayName = 'Pagination.Ellipsis'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Pagination = Object.assign(PaginationRoot, {
  Root: PaginationRoot,
  Content: PaginationContent,
  Item: PaginationItem,
  Previous: PaginationPrevious,
  Next: PaginationNext,
  Ellipsis: PaginationEllipsis,
})
