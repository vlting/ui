import {
  type ComponentPropsWithRef,
  createContext,
  forwardRef,
  useContext,
  useId,
} from 'react'
import { useDisclosure } from '../../headless/src/useDisclosure'
import { styled } from '../../stl-react/src/config'

// ─── Context ────────────────────────────────────────────────────────────────

interface CollapsibleContextValue {
  isOpen: boolean
  toggle: () => void
  disabled: boolean
  contentId: string
  triggerId: string
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null)

function useCollapsibleContext() {
  const ctx = useContext(CollapsibleContext)
  if (!ctx) {
    throw new Error(
      'Collapsible compound components must be used within Collapsible.Root',
    )
  }
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledRoot = styled('div', {
  display: 'flex',
  flexDirection: 'column',
}, { name: 'CollapsibleRoot' })

const StyledTrigger = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  bg: 'transparent',
  border: 'none',
  cursor: 'pointer',
  py: '$12',
  px: '$0',
  fontSize: '$p',
  fontWeight: '$500',
  fontFamily: '$body',
  color: 'inherit',
  ':interact': { bg: '$neutralAlpha2', textDecoration: 'underline' },
  ':pressed': { bg: '$neutralAlpha3' },
  ':focus': { outline: '$neutral', outlineOffset: '$offsetDefault' },
}, {
  name: 'CollapsibleTrigger',
  variants: {
    disabled: {
      true: { opacity: '$disabledOpacity', cursor: 'not-allowed', pointerEvents: 'none' },
    },
  },
})

const StyledChevron = styled('span', {
  display: 'flex',
  alignItems: 'center',
  color: '$neutral7',
  transitionProperty: 'transform',
  transitionDuration: '$fastDuration',
  transitionTimingFunction: 'ease',
  lowMotion: {
    transitionDuration: '0.01s',
  },
}, {
  name: 'CollapsibleChevron',
  variants: {
    open: {
      true: { transform: 'rotate(180deg)' },
      false: { transform: 'rotate(0deg)' },
    },
  },
})

const StyledContentGrid = styled('div', {
  display: 'grid',
  gtRows: '0fr',
  transitionProperty: 'grid-template-rows',
  transitionDuration: '$fastDuration',
  transitionTimingFunction: 'ease',
  lowMotion: { transitionDuration: '0.01s' },
}, {
  name: 'CollapsibleContentGrid',
  variants: {
    open: {
      true: { gtRows: '1fr' },
    },
  },
})

const StyledContent = styled('div', {
  overflow: 'hidden',
  minHeight: '0',
  px: '$0',
  fontSize: '$15',
  fontWeight: '$300',
  color: '$neutral9',
  transitionProperty: 'padding',
  transitionDuration: '$fastDuration',
  transitionTimingFunction: 'ease',
  lowMotion: { transitionDuration: '0.01s' },
}, {
  name: 'CollapsibleContent',
  variants: {
    open: {
      true: { pt: '$4', pb: '$20' },
      false: { py: '$0' },
    },
  },
})

// ─── Chevron Icon ────────────────────────────────────────────────────────────

function ChevronDown() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  )
}

// ─── Root ───────────────────────────────────────────────────────────────────

export interface CollapsibleRootProps
  extends ComponentPropsWithRef<typeof StyledRoot> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
}

const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleRootProps>(
  (
    { open, defaultOpen, onOpenChange, disabled = false, children, ...rest },
    ref,
  ) => {
    const { isOpen, onToggle } = useDisclosure({
      open,
      defaultOpen,
      onOpenChange,
    })
    const contentId = useId()
    const triggerId = useId()

    return (
      <CollapsibleContext.Provider
        value={{
          isOpen,
          toggle: onToggle,
          disabled,
          contentId,
          triggerId,
        }}
      >
        <StyledRoot
          ref={ref}
          data-state={isOpen ? 'open' : 'closed'}
          {...rest}
        >
          {children}
        </StyledRoot>
      </CollapsibleContext.Provider>
    )
  },
)
CollapsibleRoot.displayName = 'Collapsible.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface CollapsibleTriggerProps
  extends ComponentPropsWithRef<typeof StyledTrigger> {
  indicator?: boolean
}

const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ onClick, indicator = true, children, ...rest }, ref) => {
  const ctx = useCollapsibleContext()

  return (
    <StyledTrigger
      ref={ref}
      id={ctx.triggerId}
      type="button"
      aria-expanded={ctx.isOpen}
      aria-controls={ctx.contentId}
      data-state={ctx.isOpen ? 'open' : 'closed'}
      disabled={ctx.disabled}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ctx.disabled) {
          ctx.toggle()
        }
        onClick?.(e)
      }}
      {...rest}
    >
      {children}
      {indicator && (
        <StyledChevron
          open={ctx.isOpen}
          data-state={ctx.isOpen ? 'open' : 'closed'}
        >
          <ChevronDown />
        </StyledChevron>
      )}
    </StyledTrigger>
  )
})
CollapsibleTrigger.displayName = 'Collapsible.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface CollapsibleContentProps
  extends ComponentPropsWithRef<typeof StyledContent> {}

const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  (props, ref) => {
    const ctx = useCollapsibleContext()

    return (
      <StyledContentGrid
        open={ctx.isOpen}
        data-state={ctx.isOpen ? 'open' : 'closed'}
        aria-hidden={!ctx.isOpen}
      >
        <StyledContent
          ref={ref}
          open={ctx.isOpen}
          id={ctx.contentId}
          role="region"
          aria-labelledby={ctx.triggerId}
          data-state={ctx.isOpen ? 'open' : 'closed'}
          {...props}
        />
      </StyledContentGrid>
    )
  },
)
CollapsibleContent.displayName = 'Collapsible.Content'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Collapsible = Object.assign(CollapsibleRoot, {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
})
