import {
  type ComponentPropsWithRef,
  type ReactElement,
  type ReactNode,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import { usePopoverPosition } from '../../headless/src/usePopoverPosition'
import { styled } from '../../stl-react/src/config'
import { Portal } from '../../stl-react/src/primitives/Portal/Portal'
import { mergeRefs } from '../../utils/mergeRefs'

// ─── Types ──────────────────────────────────────────────────────────────────

type Placement = 'top' | 'bottom' | 'left' | 'right'

// ─── Context ────────────────────────────────────────────────────────────────

interface TooltipContextValue {
  isOpen: boolean
  show: () => void
  hide: () => void
  tooltipId: string
  triggerRef: React.RefObject<HTMLElement | null>
  placement: Placement
  offset: number
}

const TooltipContext = createContext<TooltipContextValue | null>(null)

function useTooltipContext() {
  const ctx = useContext(TooltipContext)
  if (!ctx) {
    throw new Error(
      'Tooltip compound components must be used within Tooltip.Root',
    )
  }
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledContent = styled('div', {
  position: 'fixed',
  bg: '$neutral12',
  color: '$neutralText12',
  radius: '$2',
  px: '$8',
  py: '$4',
  fontSize: '$small',
  zIndex: '$max',
  boxShadow: '$sm',
  pointerEvents: 'none',
  maxWidth: '240px',
}, { name: 'TooltipContent' })

// ─── Root (compound) ────────────────────────────────────────────────────────

export interface TooltipRootProps {
  children: ReactNode
  placement?: Placement
  offset?: number
  showDelay?: number
  hideDelay?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const TooltipRoot = forwardRef<HTMLDivElement, TooltipRootProps>(
  ({
    children,
    placement = 'top',
    offset = 8,
    showDelay = 200,
    hideDelay = 100,
    open: controlledOpen,
    onOpenChange,
  }, _ref) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
    const isControlled = controlledOpen !== undefined
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen
    const tooltipId = useId()
    const triggerRef = useRef<HTMLElement>(null)
    const showTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

    const setOpen = useCallback(
      (value: boolean) => {
        if (!isControlled) setUncontrolledOpen(value)
        onOpenChange?.(value)
      },
      [isControlled, onOpenChange],
    )

    const show = useCallback(() => {
      clearTimeout(hideTimeoutRef.current)
      showTimeoutRef.current = setTimeout(() => setOpen(true), showDelay)
    }, [showDelay, setOpen])

    const hide = useCallback(() => {
      clearTimeout(showTimeoutRef.current)
      hideTimeoutRef.current = setTimeout(() => setOpen(false), hideDelay)
    }, [hideDelay, setOpen])

    useEffect(() => {
      return () => {
        clearTimeout(showTimeoutRef.current)
        clearTimeout(hideTimeoutRef.current)
      }
    }, [])

    return (
      <TooltipContext.Provider
        value={{ isOpen, show, hide, tooltipId, triggerRef, placement, offset }}
      >
        {children}
      </TooltipContext.Provider>
    )
  },
)
TooltipRoot.displayName = 'Tooltip.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface TooltipTriggerProps {
  children: ReactElement
}

const TooltipTrigger = forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ children }, ref) => {
    const { isOpen, show, hide, tooltipId, triggerRef } = useTooltipContext()

    if (!isValidElement(children)) return children as any

    return cloneElement(children as ReactElement<any>, {
      ref: mergeRefs(ref, triggerRef, (children as any).ref),
      onMouseEnter: (e: React.MouseEvent) => {
        show()
        ;(children as any).props?.onMouseEnter?.(e)
      },
      onMouseLeave: (e: React.MouseEvent) => {
        hide()
        ;(children as any).props?.onMouseLeave?.(e)
      },
      onFocus: (e: React.FocusEvent) => {
        show()
        ;(children as any).props?.onFocus?.(e)
      },
      onBlur: (e: React.FocusEvent) => {
        hide()
        ;(children as any).props?.onBlur?.(e)
      },
      'aria-describedby': isOpen ? tooltipId : undefined,
    })
  },
)
TooltipTrigger.displayName = 'Tooltip.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface TooltipContentProps
  extends ComponentPropsWithRef<typeof StyledContent> {}

const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ children, ...rest }, ref) => {
    const { isOpen, tooltipId, triggerRef, placement, offset } = useTooltipContext()
    const contentRef = useRef<HTMLDivElement>(null)

    const { position } = usePopoverPosition({
      placement,
      offset,
      triggerRef: triggerRef as React.RefObject<HTMLElement>,
      contentRef: contentRef as React.RefObject<HTMLElement>,
      isOpen,
    })

    if (!isOpen) return null

    return (
      <Portal>
        <StyledContent
          ref={mergeRefs(ref, contentRef)}
          id={tooltipId}
          role="tooltip"
          data-state="open"
          style={{ top: position.top, left: position.left }}
          {...rest}
        >
          {children}
        </StyledContent>
      </Portal>
    )
  },
)
TooltipContent.displayName = 'Tooltip.Content'

// ─── Simple Wrapper ─────────────────────────────────────────────────────────

export interface TooltipProps {
  children: ReactElement
  content: ReactNode
  placement?: Placement
  offset?: number
  showDelay?: number
  hideDelay?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * Simple Tooltip wrapper: `<Tooltip content="text"><Button>Hover me</Button></Tooltip>`
 */
const TooltipSimple = forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, content, ...rootProps }, _ref) => {
    return (
      <TooltipRoot {...rootProps}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </TooltipRoot>
    )
  },
)
TooltipSimple.displayName = 'Tooltip'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Tooltip = Object.assign(TooltipSimple, {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
})

/** @deprecated Use Tooltip instead */
export const TooltipProvider = ({ children }: { children: ReactNode }) => <>{children}</>
