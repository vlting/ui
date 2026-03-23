import {
  type ComponentPropsWithRef,
  type ReactElement,
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

interface HoverCardContextValue {
  isOpen: boolean
  show: () => void
  hide: () => void
  contentId: string
  triggerRef: React.RefObject<HTMLElement | null>
  placement: Placement
  offset: number
}

const HoverCardContext = createContext<HoverCardContextValue | null>(null)

function useHoverCardContext() {
  const ctx = useContext(HoverCardContext)
  if (!ctx) {
    throw new Error(
      'HoverCard compound components must be used within HoverCard.Root',
    )
  }
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledContent = styled('div', {
  position: 'fixed',
  bg: '$surface1',
  radius: '$4',
  boxShadow: '$lg',
  p: '$16',
  zIndex: '$max',
  maxWidth: '320px',
  borderWidth: '$widthMin',
  borderStyle: '$styleDefault',
  borderColor: '$neutralMin',
}, { name: 'HoverCardContent' })

// ─── Root ───────────────────────────────────────────────────────────────────

export interface HoverCardRootProps {
  children: React.ReactNode
  placement?: Placement
  offset?: number
  showDelay?: number
  hideDelay?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const HoverCardRoot = forwardRef<HTMLDivElement, HoverCardRootProps>(
  ({
    children,
    placement = 'bottom',
    offset = 8,
    showDelay = 300,
    hideDelay = 200,
    open: controlledOpen,
    onOpenChange,
  }, _ref) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
    const isControlled = controlledOpen !== undefined
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen
    const contentId = useId()
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
      <HoverCardContext.Provider
        value={{ isOpen, show, hide, contentId, triggerRef, placement, offset }}
      >
        {children}
      </HoverCardContext.Provider>
    )
  },
)
HoverCardRoot.displayName = 'HoverCard.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface HoverCardTriggerProps {
  children: ReactElement
}

const HoverCardTrigger = forwardRef<HTMLElement, HoverCardTriggerProps>(
  ({ children }, ref) => {
    const { show, hide, triggerRef } = useHoverCardContext()

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
    })
  },
)
HoverCardTrigger.displayName = 'HoverCard.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface HoverCardContentProps
  extends ComponentPropsWithRef<typeof StyledContent> {}

const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({ children, ...rest }, ref) => {
    const { isOpen, show, hide, contentId, triggerRef, placement, offset } = useHoverCardContext()
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
          id={contentId}
          data-state="open"
          style={{ top: position.top, left: position.left }}
          onMouseEnter={show}
          onMouseLeave={hide}
          {...rest}
        >
          {children}
        </StyledContent>
      </Portal>
    )
  },
)
HoverCardContent.displayName = 'HoverCard.Content'

// ─── Export ─────────────────────────────────────────────────────────────────

export const HoverCard = Object.assign(HoverCardRoot, {
  Root: HoverCardRoot,
  Trigger: HoverCardTrigger,
  Content: HoverCardContent,
})
