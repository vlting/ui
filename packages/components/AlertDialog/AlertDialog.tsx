import {
  type ComponentPropsWithRef,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
} from 'react'
import { useDisclosure } from '../../headless/src/useDisclosure'
import { useFocusScope } from '../../headless/src/useFocusScope'
import { styled } from '../../stl-react/src/config'
import { Portal } from '../../stl-react/src/primitives/Portal/Portal'
import { mergeRefs } from '../../utils/mergeRefs'

// ─── Context ────────────────────────────────────────────────────────────────

interface AlertDialogContextValue {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  contentId: string
  titleId: string
  descriptionId: string
}

const AlertDialogContext = createContext<AlertDialogContextValue | null>(null)

function useAlertDialogContext() {
  const ctx = useContext(AlertDialogContext)
  if (!ctx) {
    throw new Error(
      'AlertDialog compound components must be used within AlertDialog.Root',
    )
  }
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledOverlay = styled('div', {
  position: 'fixed',
  inset: '0',
  bg: '$overlayBackground',
  zIndex: '50',
  transitionProperty: 'opacity',
  transitionDuration: '$fastDuration',
  lowMotion: { transitionDuration: '0.01s' },
}, { name: 'AlertDialogOverlay' })

const StyledContentWrapper = styled('div', {
  position: 'fixed',
  inset: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: '50',
  p: '$16',
}, { name: 'AlertDialogContentWrapper' })

const StyledContent = styled('div', {
  position: 'relative',
  bg: '$surface1',
  radius: '$6',
  boxShadow: '$lg',
  p: '$24',
  width: '100%',
  maxHeight: '85%',
  overflow: 'auto',
  transitionProperty: 'opacity, transform',
  transitionDuration: '$fastDuration',
  lowMotion: { transitionDuration: '0.01s' },
}, {
  name: 'AlertDialogContent',
  variants: {
    size: {
      sm: { maxWidth: '$400' },
      md: { maxWidth: '$480' },
      lg: { maxWidth: '$640' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const StyledTitle = styled('h2', {
  fontSize: '$heading4',
  fontWeight: '$600',
  fontFamily: '$heading',
  m: '$0',
}, { name: 'AlertDialogTitle' })

const StyledDescription = styled('p', {
  fontSize: '$p',
  color: '$neutral9',
  m: '$0',
}, { name: 'AlertDialogDescription' })

const StyledFooter = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '$8',
  pt: '$16',
  justifyContent: 'end',
}, { name: 'AlertDialogFooter' })

const StyledCancel = styled('div', {
  display: 'contents',
}, { name: 'AlertDialogCancel' })

const StyledAction = styled('div', {
  display: 'contents',
}, { name: 'AlertDialogAction' })

// ─── Root ───────────────────────────────────────────────────────────────────

export interface AlertDialogRootProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const AlertDialogRoot = forwardRef<HTMLDivElement, AlertDialogRootProps>(
  ({ children, open, defaultOpen, onOpenChange: onOpenChangeProp }, _ref) => {
    const disclosure = useDisclosure({
      open,
      defaultOpen,
      onOpenChange: onOpenChangeProp,
    })

    const contentId = useId()
    const titleId = useId()
    const descriptionId = useId()

    return (
      <AlertDialogContext.Provider
        value={{
          isOpen: disclosure.isOpen,
          onOpenChange: (next: boolean) => {
            if (next) disclosure.onOpen()
            else disclosure.onClose()
          },
          contentId,
          titleId,
          descriptionId,
        }}
      >
        {children}
      </AlertDialogContext.Provider>
    )
  },
)
AlertDialogRoot.displayName = 'AlertDialog.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface AlertDialogTriggerProps
  extends ComponentPropsWithRef<'button'> {}

const AlertDialogTrigger = forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(
  ({ children, onClick, ...rest }, ref) => {
    const { onOpenChange } = useAlertDialogContext()

    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          onOpenChange(true)
          onClick?.(e)
        }}
        {...rest}
      >
        {children}
      </button>
    )
  },
)
AlertDialogTrigger.displayName = 'AlertDialog.Trigger'

// ─── Overlay ────────────────────────────────────────────────────────────────

export interface AlertDialogOverlayProps
  extends ComponentPropsWithRef<typeof StyledOverlay> {}

const AlertDialogOverlay = forwardRef<HTMLDivElement, AlertDialogOverlayProps>(
  (props, ref) => (
    <StyledOverlay ref={ref} data-state="open" {...props} />
  ),
)
AlertDialogOverlay.displayName = 'AlertDialog.Overlay'

// ─── Content ────────────────────────────────────────────────────────────────

export interface AlertDialogContentProps
  extends ComponentPropsWithRef<typeof StyledContent> {}

/** Inner component that mounts only when open, so useFocusScope hooks fire correctly. */
const AlertDialogContentInner = forwardRef<HTMLDivElement, AlertDialogContentProps>(
  ({ children, onKeyDown, ...rest }, ref) => {
    const { onOpenChange, titleId, descriptionId } = useAlertDialogContext()
    const { getScopeProps } = useFocusScope({
      contain: true,
      restoreFocus: true,
      autoFocus: true,
    })
    const scopeProps = getScopeProps()

    // Document-level keyboard listener for Escape + focus trap (Tab)
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onOpenChange(false)
        } else if (e.key === 'Tab') {
          // Delegate Tab to focus scope for trapping
          scopeProps.onKeyDown(e as unknown as React.KeyboardEvent)
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [onOpenChange, scopeProps])

    return (
      <Portal>
        <StyledOverlay data-state="open" />
        <StyledContentWrapper>
          <StyledContent
            ref={mergeRefs(ref, scopeProps.ref)}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            onKeyDown={(e) => {
              scopeProps.onKeyDown(e)
              onKeyDown?.(e)
            }}
            data-state="open"
            {...rest}
          >
            {children}
          </StyledContent>
        </StyledContentWrapper>
      </Portal>
    )
  },
)
AlertDialogContentInner.displayName = 'AlertDialog.ContentInner'

const AlertDialogContent = forwardRef<HTMLDivElement, AlertDialogContentProps>(
  (props, ref) => {
    const { isOpen } = useAlertDialogContext()
    if (!isOpen) return null
    return <AlertDialogContentInner ref={ref} {...props} />
  },
)
AlertDialogContent.displayName = 'AlertDialog.Content'

// ─── Title ──────────────────────────────────────────────────────────────────

export interface AlertDialogTitleProps
  extends ComponentPropsWithRef<typeof StyledTitle> {}

const AlertDialogTitle = forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(
  (props, ref) => {
    const { titleId } = useAlertDialogContext()
    return <StyledTitle ref={ref} id={titleId} {...props} />
  },
)
AlertDialogTitle.displayName = 'AlertDialog.Title'

// ─── Description ────────────────────────────────────────────────────────────

export interface AlertDialogDescriptionProps
  extends ComponentPropsWithRef<typeof StyledDescription> {}

const AlertDialogDescription = forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>(
  (props, ref) => {
    const { descriptionId } = useAlertDialogContext()
    return <StyledDescription ref={ref} id={descriptionId} {...props} />
  },
)
AlertDialogDescription.displayName = 'AlertDialog.Description'

// ─── Footer ─────────────────────────────────────────────────────────────────

export interface AlertDialogFooterProps
  extends ComponentPropsWithRef<typeof StyledFooter> {}

const AlertDialogFooter = forwardRef<HTMLDivElement, AlertDialogFooterProps>(
  (props, ref) => <StyledFooter ref={ref} {...props} />,
)
AlertDialogFooter.displayName = 'AlertDialog.Footer'

// ─── Cancel ─────────────────────────────────────────────────────────────────

export interface AlertDialogCancelProps
  extends ComponentPropsWithRef<typeof StyledCancel> {}

const AlertDialogCancel = forwardRef<HTMLDivElement, AlertDialogCancelProps>(
  ({ children, onClick, ...rest }, ref) => {
    const { onOpenChange } = useAlertDialogContext()

    return (
      <StyledCancel
        ref={ref}
        onClick={(e) => {
          onOpenChange(false)
          onClick?.(e)
        }}
        {...rest}
      >
        {children}
      </StyledCancel>
    )
  },
)
AlertDialogCancel.displayName = 'AlertDialog.Cancel'

// ─── Action ─────────────────────────────────────────────────────────────────

export interface AlertDialogActionProps
  extends ComponentPropsWithRef<typeof StyledAction> {}

const AlertDialogAction = forwardRef<HTMLDivElement, AlertDialogActionProps>(
  ({ children, onClick, ...rest }, ref) => {
    const { onOpenChange } = useAlertDialogContext()

    return (
      <StyledAction
        ref={ref}
        onClick={(e) => {
          onOpenChange(false)
          onClick?.(e)
        }}
        {...rest}
      >
        {children}
      </StyledAction>
    )
  },
)
AlertDialogAction.displayName = 'AlertDialog.Action'

// ─── Export ─────────────────────────────────────────────────────────────────

export const AlertDialog = Object.assign(AlertDialogRoot, {
  Root: AlertDialogRoot,
  Trigger: AlertDialogTrigger,
  Overlay: AlertDialogOverlay,
  Content: AlertDialogContent,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Footer: AlertDialogFooter,
  Cancel: AlertDialogCancel,
  Action: AlertDialogAction,
})
