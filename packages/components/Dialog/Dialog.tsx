import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
} from 'react'
import { createPortal } from 'react-dom'
import { styled } from '../../stl-react/src/config'
import { useDisclosure } from '../../stl-headless/src'

const StyledOverlay = styled(
  'div',
  {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'var(--stl-maxAlpha8, rgba(0,0,0,0.5))',
    zIndex: '40',
    transition: 'opacity 200ms ease',
  },
  'DialogOverlay',
)

const StyledContent = styled(
  'div',
  {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'var(--background, #fff)',
    borderRadius: '12px',
    width: '90%',
    maxHeight: '85%',
    overflowY: 'auto',
    zIndex: '50',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    boxShadow: 'var(--shadowXl, 0 25px 50px -12px rgba(0,0,0,0.25))',
    transition: 'opacity 200ms ease, transform 200ms ease',
  },
  {
    size: {
      sm: { maxWidth: '400px', padding: '16px' },
      md: { maxWidth: '500px', padding: '20px' },
      lg: { maxWidth: '640px', padding: '24px' },
    },
  },
  'DialogContent',
)

const StyledTitle = styled(
  'h2',
  {
    fontFamily: 'var(--font-heading)',
    fontWeight: '600',
    fontSize: 'var(--fontSize-6, 20px)',
    lineHeight: '1.3',
    color: 'var(--color)',
    margin: '0',
  },
  'DialogTitle',
)

const StyledDescription = styled(
  'p',
  {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--fontSize-4, 16px)',
    color: 'var(--colorSubtitle)',
    margin: '0',
  },
  'DialogDescription',
)

const StyledHeader = styled(
  'div',
  { display: 'flex', flexDirection: 'column', gap: '4px' },
  'DialogHeader',
)

const StyledFooter = styled(
  'div',
  {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    paddingTop: '12px',
  },
  'DialogFooter',
)

interface DialogContextValue {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  titleId: string
  descriptionId: string
}

const DialogContext = createContext<DialogContextValue>({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
  titleId: '',
  descriptionId: '',
})

export interface DialogRootProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function Root({ children, open, defaultOpen, onOpenChange }: DialogRootProps) {
  const disclosure = useDisclosure({ open, defaultOpen, onOpenChange })
  const id = useId()

  return (
    <DialogContext.Provider
      value={{
        isOpen: disclosure.isOpen,
        onOpen: disclosure.onOpen,
        onClose: disclosure.onClose,
        titleId: `dialog-title-${id}`,
        descriptionId: `dialog-desc-${id}`,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

function Trigger({ children }: { children: React.ReactNode }) {
  const { onOpen } = useContext(DialogContext)

  return (
    <span onClick={onOpen} style={{ display: 'inline-flex', cursor: 'pointer' }}>
      {children}
    </span>
  )
}

function Overlay() {
  return null
}

interface DialogContentProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

function Content({ children, size = 'md' }: DialogContentProps) {
  const { isOpen, onClose, titleId, descriptionId } = useContext(DialogContext)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key === 'Tab') {
        const focusable = contentRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusable || focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const firstFocusable = contentRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    firstFocusable?.focus()

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <>
      <StyledOverlay onClick={onClose} />
      <StyledContent
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        size={size}
      >
        {children}
      </StyledContent>
    </>,
    document.body,
  )
}

function Title({ children }: { children: React.ReactNode }) {
  const { titleId } = useContext(DialogContext)
  return <StyledTitle id={titleId}>{children}</StyledTitle>
}

function Description({ children }: { children: React.ReactNode }) {
  const { descriptionId } = useContext(DialogContext)
  return <StyledDescription id={descriptionId}>{children}</StyledDescription>
}

const StyledClose = styled(
  'button',
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'var(--color)',
    borderRadius: '4px',
    padding: '4px',
    outline: 'none',
    transition: 'background-color 150ms ease',
    hovered: {
      backgroundColor: 'var(--color3)',
    },
    focused: {
      outline: '2px solid var(--stl-outline-primaryColorBase, currentColor)',
      outlineOffset: '2px',
    },
    pressed: {
      backgroundColor: 'var(--color4)',
    },
  },
  'DialogClose',
)

function Close({ children }: { children?: React.ReactNode }) {
  const { onClose } = useContext(DialogContext)
  return (
    <StyledClose onClick={onClose} type="button" aria-label="Close dialog">
      {children}
    </StyledClose>
  )
}

function Header({ children }: { children: React.ReactNode }) {
  return <StyledHeader>{children}</StyledHeader>
}

function Footer({ children }: { children: React.ReactNode }) {
  return <StyledFooter>{children}</StyledFooter>
}

export const Dialog = {
  Root,
  Trigger,
  Overlay,
  Content,
  Title,
  Description,
  Close,
  Header,
  Footer,
}
