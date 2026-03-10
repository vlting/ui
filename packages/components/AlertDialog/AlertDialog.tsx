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
    backgroundColor: 'var(--overlayBackground, rgba(0,0,0,0.5))',
    zIndex: '40',
    transition: 'opacity 200ms ease',
  },
  'AlertDialogOverlay',
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
    padding: '20px',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '85%',
    overflowY: 'auto',
    zIndex: '50',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    boxShadow: 'var(--shadowXl, 0 25px 50px -12px rgba(0,0,0,0.25))',
    transition: 'opacity 200ms ease, transform 200ms ease',
  },
  'AlertDialogContent',
)

const StyledTitle = styled(
  'h2',
  {
    fontFamily: 'var(--font-heading)',
    fontWeight: '600',
    fontSize: 'var(--fontSize-6, 20px)',
    color: 'var(--color)',
    margin: '0',
  },
  'AlertDialogTitle',
)

const StyledDescription = styled(
  'p',
  {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--fontSize-4, 16px)',
    color: 'var(--colorSubtitle)',
    margin: '0',
  },
  'AlertDialogDescription',
)

const StyledFooter = styled(
  'div',
  {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    paddingTop: '8px',
  },
  'AlertDialogFooter',
)

interface AlertDialogContextValue {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  titleId: string
  descriptionId: string
}

const AlertDialogContext = createContext<AlertDialogContextValue>({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
  titleId: '',
  descriptionId: '',
})

export interface AlertDialogRootProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function Root({ children, open, defaultOpen, onOpenChange }: AlertDialogRootProps) {
  const disclosure = useDisclosure({ open, defaultOpen, onOpenChange })
  const id = useId()

  return (
    <AlertDialogContext.Provider
      value={{
        isOpen: disclosure.isOpen,
        onOpen: disclosure.onOpen,
        onClose: disclosure.onClose,
        titleId: `alertdialog-title-${id}`,
        descriptionId: `alertdialog-desc-${id}`,
      }}
    >
      {children}
    </AlertDialogContext.Provider>
  )
}

function Trigger({ children }: { children: React.ReactNode }) {
  const { onOpen } = useContext(AlertDialogContext)
  return (
    <span onClick={onOpen} style={{ display: 'inline-flex', cursor: 'pointer' }}>
      {children}
    </span>
  )
}

function Overlay({ children }: { children?: React.ReactNode }) {
  return null
}

function Content({ children }: { children: React.ReactNode }) {
  const { isOpen, onClose, titleId, descriptionId } = useContext(AlertDialogContext)
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
      <StyledOverlay />
      <StyledContent
        ref={contentRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        {children}
      </StyledContent>
    </>,
    document.body,
  )
}

function Title({ children }: { children: React.ReactNode }) {
  const { titleId } = useContext(AlertDialogContext)
  return <StyledTitle id={titleId}>{children}</StyledTitle>
}

function Description({ children }: { children: React.ReactNode }) {
  const { descriptionId } = useContext(AlertDialogContext)
  return <StyledDescription id={descriptionId}>{children}</StyledDescription>
}

function Footer({ children }: { children: React.ReactNode }) {
  return <StyledFooter>{children}</StyledFooter>
}

function Cancel({ children }: { children?: React.ReactNode }) {
  const { onClose } = useContext(AlertDialogContext)
  return (
    <span onClick={onClose} style={{ display: 'inline-flex', cursor: 'pointer' }}>
      {children}
    </span>
  )
}

function Action({ children }: { children?: React.ReactNode }) {
  const { onClose } = useContext(AlertDialogContext)
  return (
    <span onClick={onClose} style={{ display: 'inline-flex', cursor: 'pointer' }}>
      {children}
    </span>
  )
}

export const AlertDialog = {
  Root,
  Trigger,
  Overlay,
  Content,
  Title,
  Description,
  Footer,
  Cancel,
  Action,
}
