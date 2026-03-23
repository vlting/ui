import {
  type ComponentPropsWithRef,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
} from 'react'
import { useDisclosure } from '../../headless/src/useDisclosure'
import { useFocusScope } from '../../headless/src/useFocusScope'
import { usePopoverPosition } from '../../headless/src/usePopoverPosition'
import { styled } from '../../stl-react/src/config'
import { Portal } from '../../stl-react/src/primitives/Portal/Portal'
import { mergeRefs } from '../../utils/mergeRefs'

// ─── Types ──────────────────────────────────────────────────────────────────

type Placement = 'top' | 'bottom' | 'left' | 'right'

// ─── Context ────────────────────────────────────────────────────────────────

interface PopoverContextValue {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  contentId: string
  triggerRef: React.RefObject<HTMLButtonElement | null>
  placement: Placement
  offset: number
}

const PopoverContext = createContext<PopoverContextValue | null>(null)

function usePopoverContext() {
  const ctx = useContext(PopoverContext)
  if (!ctx) {
    throw new Error(
      'Popover compound components must be used within Popover.Root',
    )
  }
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledContent = styled('div', {
  position: 'fixed',
  bg: '$surface1',
  radius: '$4',
  boxShadow: '$md',
  p: '$16',
  zIndex: '$max',
  maxWidth: '320px',
  borderWidth: '$widthMin',
  borderStyle: '$styleDefault',
  borderColor: '$neutralMin',
}, { name: 'PopoverContent' })

const StyledArrow = styled('div', {
  position: 'absolute',
  width: '12px',
  height: '12px',
  bg: '$surface1',
  borderWidth: '$widthMin',
  borderStyle: '$styleDefault',
  borderColor: '$neutralMin',
  transform: 'rotate(45deg)',
  zIndex: '-1',
}, { name: 'PopoverArrow' })

const StyledClose = styled('button', {
  position: 'absolute',
  top: '$8',
  right: '$8',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bg: 'transparent',
  border: 'none',
  cursor: 'pointer',
  p: '$4',
  radius: '$4',
  color: '$neutral9',
  ':interact': { bg: '$neutralAlpha2' },
  ':focus': { outline: '$neutral', outlineOffset: '$offsetDefault' },
}, { name: 'PopoverClose' })

// ─── Close Icon ─────────────────────────────────────────────────────────────

const CloseIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
)

// ─── Root ───────────────────────────────────────────────────────────────────

export interface PopoverRootProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  placement?: Placement
  offset?: number
}

const PopoverRoot = forwardRef<HTMLDivElement, PopoverRootProps>(
  ({ children, open, defaultOpen, onOpenChange: onOpenChangeProp, placement = 'bottom', offset = 8 }, _ref) => {
    const disclosure = useDisclosure({
      open,
      defaultOpen,
      onOpenChange: onOpenChangeProp,
    })

    const contentId = useId()
    const triggerRef = useRef<HTMLButtonElement>(null)

    return (
      <PopoverContext.Provider
        value={{
          isOpen: disclosure.isOpen,
          onOpenChange: (next: boolean) => {
            if (next) disclosure.onOpen()
            else disclosure.onClose()
          },
          contentId,
          triggerRef,
          placement,
          offset,
        }}
      >
        {children}
      </PopoverContext.Provider>
    )
  },
)
PopoverRoot.displayName = 'Popover.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface PopoverTriggerProps
  extends ComponentPropsWithRef<'button'> {}

const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ children, onClick, ...rest }, ref) => {
    const { isOpen, onOpenChange, contentId, triggerRef } = usePopoverContext()

    return (
      <button
        ref={mergeRefs(ref, triggerRef)}
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        aria-haspopup="dialog"
        data-state={isOpen ? 'open' : 'closed'}
        onClick={(e) => {
          onOpenChange(!isOpen)
          onClick?.(e)
        }}
        {...rest}
      >
        {children}
      </button>
    )
  },
)
PopoverTrigger.displayName = 'Popover.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface PopoverContentProps
  extends ComponentPropsWithRef<typeof StyledContent> {
  placement?: Placement
}

const PopoverContentInner = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, onKeyDown, ...rest }, ref) => {
    const { isOpen, onOpenChange, contentId, triggerRef, placement, offset } = usePopoverContext()
    const contentRef = useRef<HTMLDivElement>(null)

    const { position } = usePopoverPosition({
      placement,
      offset,
      triggerRef: triggerRef as React.RefObject<HTMLElement>,
      contentRef: contentRef as React.RefObject<HTMLElement>,
      isOpen,
    })

    const { getScopeProps } = useFocusScope({
      contain: true,
      restoreFocus: true,
      autoFocus: true,
    })
    const scopeProps = getScopeProps()

    // Escape key
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onOpenChange(false)
        } else if (e.key === 'Tab') {
          scopeProps.onKeyDown(e as unknown as React.KeyboardEvent)
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [onOpenChange, scopeProps])

    // Click outside
    useEffect(() => {
      const handleMouseDown = (e: MouseEvent) => {
        const target = e.target as Node
        if (
          contentRef.current && !contentRef.current.contains(target) &&
          triggerRef.current && !triggerRef.current.contains(target)
        ) {
          onOpenChange(false)
        }
      }
      document.addEventListener('mousedown', handleMouseDown)
      return () => document.removeEventListener('mousedown', handleMouseDown)
    }, [onOpenChange, triggerRef])

    return (
      <Portal>
        <StyledContent
          ref={mergeRefs(ref, contentRef, scopeProps.ref)}
          id={contentId}
          role="dialog"
          data-state="open"
          style={{ top: position.top, left: position.left }}
          onKeyDown={(e) => {
            scopeProps.onKeyDown(e)
            onKeyDown?.(e)
          }}
          {...rest}
        >
          {children}
        </StyledContent>
      </Portal>
    )
  },
)
PopoverContentInner.displayName = 'Popover.ContentInner'

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  (props, ref) => {
    const { isOpen } = usePopoverContext()
    if (!isOpen) return null
    return <PopoverContentInner ref={ref} {...props} />
  },
)
PopoverContent.displayName = 'Popover.Content'

// ─── Arrow ──────────────────────────────────────────────────────────────────

export interface PopoverArrowProps
  extends ComponentPropsWithRef<typeof StyledArrow> {}

const PopoverArrow = forwardRef<HTMLDivElement, PopoverArrowProps>(
  (props, ref) => <StyledArrow ref={ref} aria-hidden="true" {...props} />,
)
PopoverArrow.displayName = 'Popover.Arrow'

// ─── Close ──────────────────────────────────────────────────────────────────

export interface PopoverCloseProps
  extends ComponentPropsWithRef<typeof StyledClose> {}

const PopoverClose = forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ children, onClick, ...rest }, ref) => {
    const { onOpenChange } = usePopoverContext()

    return (
      <StyledClose
        ref={ref}
        type="button"
        aria-label="Close popover"
        onClick={(e) => {
          onOpenChange(false)
          onClick?.(e)
        }}
        {...rest}
      >
        {children || <CloseIcon />}
      </StyledClose>
    )
  },
)
PopoverClose.displayName = 'Popover.Close'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Popover = Object.assign(PopoverRoot, {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Arrow: PopoverArrow,
  Close: PopoverClose,
})
