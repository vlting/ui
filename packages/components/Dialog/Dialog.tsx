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

interface DialogContextValue {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  contentId: string
  titleId: string
  descriptionId: string
}

const DialogContext = createContext<DialogContextValue | null>(null)

function useDialogContext() {
  const ctx = useContext(DialogContext)
  if (!ctx) {
    throw new Error(
      'Dialog compound components must be used within Dialog.Root',
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
}, { name: 'DialogOverlay' })

const StyledContentWrapper = styled('div', {
  position: 'fixed',
  inset: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: '50',
  p: '$16',
}, { name: 'DialogContentWrapper' })

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
  name: 'DialogContent',
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

const StyledHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  pb: '$16',
}, { name: 'DialogHeader' })

const StyledTitle = styled('h2', {
  fontSize: '$heading4',
  fontWeight: '$600',
  fontFamily: '$heading',
  m: '$0',
}, { name: 'DialogTitle' })

const StyledDescription = styled('p', {
  fontSize: '$p',
  color: '$neutral9',
  m: '$0',
}, { name: 'DialogDescription' })

const StyledFooter = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '$8',
  pt: '$16',
  justifyContent: 'end',
}, { name: 'DialogFooter' })

const StyledClose = styled('button', {
  position: 'absolute',
  top: '$12',
  right: '$12',
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
}, { name: 'DialogClose' })

// ─── Close Icon ─────────────────────────────────────────────────────────────

const CloseIcon = () => (
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
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
)

// ─── Root ───────────────────────────────────────────────────────────────────

export interface DialogRootProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const DialogRoot = forwardRef<HTMLDivElement, DialogRootProps>(
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
      <DialogContext.Provider
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
      </DialogContext.Provider>
    )
  },
)
DialogRoot.displayName = 'Dialog.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface DialogTriggerProps
  extends ComponentPropsWithRef<'button'> {}

const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ children, onClick, ...rest }, ref) => {
    const { onOpenChange } = useDialogContext()

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
DialogTrigger.displayName = 'Dialog.Trigger'

// ─── Overlay ────────────────────────────────────────────────────────────────

export interface DialogOverlayProps
  extends ComponentPropsWithRef<typeof StyledOverlay> {}

const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(
  (props, ref) => {
    const { onOpenChange } = useDialogContext()

    return (
      <StyledOverlay
        ref={ref}
        onClick={() => onOpenChange(false)}
        data-state="open"
        {...props}
      />
    )
  },
)
DialogOverlay.displayName = 'Dialog.Overlay'

// ─── Content ────────────────────────────────────────────────────────────────

export interface DialogContentProps
  extends ComponentPropsWithRef<typeof StyledContent> {}

/** Inner component that mounts only when open, so useFocusScope hooks fire correctly. */
const DialogContentInner = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, onKeyDown, ...rest }, ref) => {
    const { onOpenChange, titleId, descriptionId } = useDialogContext()
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
          scopeProps.onKeyDown(e as unknown as React.KeyboardEvent)
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [onOpenChange, scopeProps])

    return (
      <Portal>
        <StyledOverlay
          onClick={() => onOpenChange(false)}
          data-state="open"
        />
        <StyledContentWrapper>
          <StyledContent
            ref={mergeRefs(ref, scopeProps.ref)}
            role="dialog"
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
DialogContentInner.displayName = 'Dialog.ContentInner'

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  (props, ref) => {
    const { isOpen } = useDialogContext()
    if (!isOpen) return null
    return <DialogContentInner ref={ref} {...props} />
  },
)
DialogContent.displayName = 'Dialog.Content'

// ─── Header ─────────────────────────────────────────────────────────────────

export interface DialogHeaderProps
  extends ComponentPropsWithRef<typeof StyledHeader> {}

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  (props, ref) => <StyledHeader ref={ref} {...props} />,
)
DialogHeader.displayName = 'Dialog.Header'

// ─── Title ──────────────────────────────────────────────────────────────────

export interface DialogTitleProps
  extends ComponentPropsWithRef<typeof StyledTitle> {}

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  (props, ref) => {
    const { titleId } = useDialogContext()
    return <StyledTitle ref={ref} id={titleId} {...props} />
  },
)
DialogTitle.displayName = 'Dialog.Title'

// ─── Description ────────────────────────────────────────────────────────────

export interface DialogDescriptionProps
  extends ComponentPropsWithRef<typeof StyledDescription> {}

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  (props, ref) => {
    const { descriptionId } = useDialogContext()
    return <StyledDescription ref={ref} id={descriptionId} {...props} />
  },
)
DialogDescription.displayName = 'Dialog.Description'

// ─── Footer ─────────────────────────────────────────────────────────────────

export interface DialogFooterProps
  extends ComponentPropsWithRef<typeof StyledFooter> {}

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  (props, ref) => <StyledFooter ref={ref} {...props} />,
)
DialogFooter.displayName = 'Dialog.Footer'

// ─── Close ──────────────────────────────────────────────────────────────────

export interface DialogCloseProps
  extends ComponentPropsWithRef<typeof StyledClose> {}

const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ children, onClick, ...rest }, ref) => {
    const { onOpenChange } = useDialogContext()

    return (
      <StyledClose
        ref={ref}
        type="button"
        aria-label="Close dialog"
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
DialogClose.displayName = 'Dialog.Close'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Dialog = Object.assign(DialogRoot, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Close: DialogClose,
})
