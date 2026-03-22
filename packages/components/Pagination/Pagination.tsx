import {
  type ComponentPropsWithRef,
  createContext,
  forwardRef,
  useContext,
} from 'react'
import { useControllableState } from '../../headless/src/useControllableState'
import { styled } from '../../stl-react/src/config'

// ─── Context ────────────────────────────────────────────────────────────────

interface PaginationContextValue {
  page: number | undefined
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

const StyledRoot = styled('nav', {
  fontFamily: '$body',
}, { name: 'PaginationRoot' })

const StyledContent = styled('ul', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  listStyle: 'none',
  m: '$0',
  p: '$0',
}, { name: 'PaginationContent' })

const StyledItem = styled('button', {
  minWidth: '36px',
  height: '36px',
  radius: '$button',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: '$body',
  fontSize: '$p',
  fontWeight: '$500',
  border: 'none',
  cursor: 'pointer',
  bg: 'transparent',
  color: '$neutral9',
  ':interact': { bg: '$neutral4' },
  ':focus': { outline: '$neutral', outlineOffset: '$offsetDefault' },
}, {
  name: 'PaginationItem',
  variants: {
    active: {
      true: { bg: '$primary9', color: '$primaryText9', ':interact': { bg: '$primary9' } },
    },
    disabled: {
      true: { opacity: '$disabledOpacity', cursor: 'not-allowed', pointerEvents: 'none' },
    },
  },
})

const StyledNavButton = styled('button', {
  minWidth: '36px',
  height: '36px',
  radius: '$button',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: '$body',
  fontSize: '$p',
  bg: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: '$neutral9',
  ':interact': { bg: '$neutral4' },
  ':focus': { outline: '$neutral', outlineOffset: '$offsetDefault' },
}, {
  name: 'PaginationNavButton',
  variants: {
    disabled: {
      true: { opacity: '$disabledOpacity', cursor: 'not-allowed', pointerEvents: 'none' },
    },
  },
})

const StyledEllipsis = styled('span', {
  minWidth: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$neutral6',
  fontSize: '$p',
  userSelect: 'none',
}, { name: 'PaginationEllipsis' })

// ─── Icons ──────────────────────────────────────────────────────────────────

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 4l-4 4 4 4" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 4l4 4-4 4" />
  </svg>
)

// ─── Root ───────────────────────────────────────────────────────────────────

export interface PaginationRootProps extends ComponentPropsWithRef<typeof StyledRoot> {
  page?: number
  defaultPage?: number
  onPageChange?: (page: number) => void
}

export type PaginationProps = PaginationRootProps
export type PaginationState = { page: number }

const PaginationRoot = forwardRef<HTMLElement, PaginationRootProps>(
  ({ page: pageProp, defaultPage = 1, onPageChange, children, ...rest }, ref) => {
    const [page, setPage] = useControllableState({
      prop: pageProp,
      defaultProp: defaultPage,
      onChange: onPageChange,
    })

    return (
      <PaginationContext.Provider value={{ page, setPage }}>
        <StyledRoot ref={ref} aria-label="Pagination" {...rest}>
          {children}
        </StyledRoot>
      </PaginationContext.Provider>
    )
  },
)
PaginationRoot.displayName = 'Pagination.Root'

// ─── Content ────────────────────────────────────────────────────────────────

export interface PaginationContentProps extends ComponentPropsWithRef<typeof StyledContent> {}

const PaginationContent = forwardRef<HTMLUListElement, PaginationContentProps>(
  (props, ref) => <StyledContent ref={ref} {...props} />,
)
PaginationContent.displayName = 'Pagination.Content'

// ─── Item ───────────────────────────────────────────────────────────────────

export interface PaginationItemProps extends Omit<ComponentPropsWithRef<typeof StyledItem>, 'value'> {
  value: number
}

const PaginationItem = forwardRef<HTMLButtonElement, PaginationItemProps>(
  ({ value, onClick, children, ...rest }, ref) => {
    const ctx = usePaginationContext()
    const isActive = ctx.page === value

    return (
      <li>
        <StyledItem
          ref={ref}
          type="button"
          active={isActive}
          aria-current={isActive ? 'page' : undefined}
          aria-label={`Page ${value}`}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            ctx.setPage(value)
            onClick?.(e)
          }}
          {...rest}
        >
          {children ?? value}
        </StyledItem>
      </li>
    )
  },
)
PaginationItem.displayName = 'Pagination.Item'

// ─── Previous ───────────────────────────────────────────────────────────────

export interface PaginationPreviousProps extends ComponentPropsWithRef<typeof StyledNavButton> {}

const PaginationPrevious = forwardRef<HTMLButtonElement, PaginationPreviousProps>(
  ({ onClick, disabled, children, ...rest }, ref) => {
    const ctx = usePaginationContext()

    return (
      <li>
        <StyledNavButton
          ref={ref}
          type="button"
          aria-label="Previous page"
          disabled={disabled}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            if (ctx.page != null && ctx.page > 1) {
              ctx.setPage(ctx.page - 1)
            }
            onClick?.(e)
          }}
          {...rest}
        >
          {children ?? <ChevronLeftIcon />}
        </StyledNavButton>
      </li>
    )
  },
)
PaginationPrevious.displayName = 'Pagination.Previous'

// ─── Next ───────────────────────────────────────────────────────────────────

export interface PaginationNextProps extends ComponentPropsWithRef<typeof StyledNavButton> {}

const PaginationNext = forwardRef<HTMLButtonElement, PaginationNextProps>(
  ({ onClick, disabled, children, ...rest }, ref) => {
    const ctx = usePaginationContext()

    return (
      <li>
        <StyledNavButton
          ref={ref}
          type="button"
          aria-label="Next page"
          disabled={disabled}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            if (ctx.page != null) {
              ctx.setPage(ctx.page + 1)
            }
            onClick?.(e)
          }}
          {...rest}
        >
          {children ?? <ChevronRightIcon />}
        </StyledNavButton>
      </li>
    )
  },
)
PaginationNext.displayName = 'Pagination.Next'

// ─── Ellipsis ───────────────────────────────────────────────────────────────

export interface PaginationEllipsisProps extends ComponentPropsWithRef<typeof StyledEllipsis> {}

const PaginationEllipsis = forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  ({ children, ...rest }, ref) => (
    <li>
      <StyledEllipsis ref={ref} aria-hidden="true" {...rest}>
        {children ?? '\u2026'}
      </StyledEllipsis>
    </li>
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
