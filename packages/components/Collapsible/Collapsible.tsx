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

const StyledRoot = styled('div', {}, { name: 'CollapsibleRoot' })
const StyledTrigger = styled('button', {}, { name: 'CollapsibleTrigger' })
const StyledContent = styled('div', {}, { name: 'CollapsibleContent' })

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
  extends ComponentPropsWithRef<typeof StyledTrigger> {}

const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ onClick, ...rest }, ref) => {
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
    />
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
      <StyledContent
        ref={ref}
        id={ctx.contentId}
        role="region"
        aria-labelledby={ctx.triggerId}
        hidden={!ctx.isOpen}
        data-state={ctx.isOpen ? 'open' : 'closed'}
        {...props}
      />
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
