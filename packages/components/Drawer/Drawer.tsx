import React, { useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import { useDisclosure } from '../../stl-headless/src'
import { styled } from '../../stl-react/src/config'

const DrawerOverlay = styled(
  'div',
  {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'var(--stl-overlay, rgba(0,0,0,0.5))',
    zIndex: '40',
    transition: 'opacity 200ms ease',
  },
  'DrawerOverlay',
)

const DrawerContentFrame = styled(
  'div',
  {
    backgroundColor: 'var(--stl-background)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--borderColor)',
    zIndex: '50',
    display: 'flex',
    flexDirection: 'column',
  },
  'DrawerContent',
)

const DrawerHeaderFrame = styled(
  'div',
  {
    paddingLeft: '28px',
    paddingRight: '28px',
    paddingTop: '16px',
    paddingBottom: '16px',
  },
  'DrawerHeader',
)

const DrawerFooterFrame = styled(
  'div',
  {
    paddingLeft: '28px',
    paddingRight: '28px',
    paddingTop: '16px',
    paddingBottom: '28px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  'DrawerFooter',
)

const HandleBar = styled(
  'div',
  {
    width: '36px',
    height: '4px',
    backgroundColor: 'var(--color6)',
    borderRadius: '9999px',
    margin: '6px auto',
  },
  'DrawerHandle',
)

const DIRECTION_STYLES: Record<string, React.CSSProperties> = {
  bottom: { position: 'fixed', bottom: 0, left: 0, right: 0, maxHeight: '90vh' },
  top: { position: 'fixed', top: 0, left: 0, right: 0, maxHeight: '90vh' },
  left: { position: 'fixed', top: 0, left: 0, bottom: 0, maxWidth: '90vw', width: 360 },
  right: { position: 'fixed', top: 0, right: 0, bottom: 0, maxWidth: '90vw', width: 360 },
}

const DIRECTION_RADII: Record<string, React.CSSProperties> = {
  bottom: { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  top: { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
  left: { borderTopRightRadius: 10, borderBottomRightRadius: 10 },
  right: { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
}

export interface DrawerRootProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  direction?: 'bottom' | 'top' | 'left' | 'right'
}

export interface DrawerContentProps {
  children: React.ReactNode
  direction?: 'bottom' | 'top' | 'left' | 'right'
  showHandle?: boolean
}

const DrawerContext = React.createContext<{
  direction: 'bottom' | 'top' | 'left' | 'right'
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
  titleId: string
  descriptionId: string
}>({
  direction: 'bottom',
  isOpen: false,
  onClose: () => {},
  onOpen: () => {},
  titleId: '',
  descriptionId: '',
})

function Root({ children, open, onOpenChange, direction = 'bottom' }: DrawerRootProps) {
  const disclosure = useDisclosure({ open, onOpenChange })
  const id = useId()

  return (
    <DrawerContext.Provider
      value={{
        direction,
        isOpen: disclosure.isOpen,
        onClose: disclosure.onClose,
        onOpen: disclosure.onOpen,
        titleId: `drawer-title-${id}`,
        descriptionId: `drawer-desc-${id}`,
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}

function Trigger({ children }: { children: React.ReactNode }) {
  const { onOpen } = React.useContext(DrawerContext)
  return (
    <span onClick={onOpen} style={{ display: 'inline-flex', cursor: 'pointer' }}>
      {children}
    </span>
  )
}

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = React.useState(false)
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setIsTouch(window.matchMedia('(pointer: coarse)').matches)
    }
  }, [])
  return isTouch
}

function Content({ children, direction: directionProp, showHandle }: DrawerContentProps) {
  const ctx = React.useContext(DrawerContext)
  const direction = directionProp ?? ctx.direction
  const isVertical = direction === 'bottom' || direction === 'top'
  const isTouch = useIsTouchDevice()
  const shouldShowHandle = showHandle ?? (isVertical && isTouch)

  useEffect(() => {
    if (!ctx.isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') ctx.onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [ctx.isOpen, ctx.onClose])

  if (!ctx.isOpen) return null

  return createPortal(
    <>
      <DrawerOverlay onClick={ctx.onClose} />
      <DrawerContentFrame
        role="dialog"
        aria-modal="true"
        aria-labelledby={ctx.titleId}
        aria-describedby={ctx.descriptionId}
        style={{
          boxShadow: 'var(--shadowLg)',
          ...DIRECTION_STYLES[direction],
          ...(isTouch ? DIRECTION_RADII[direction] : {}),
        }}
      >
        {shouldShowHandle && <HandleBar />}
        {children}
      </DrawerContentFrame>
    </>,
    document.body,
  )
}

function Header({ children }: { children: React.ReactNode }) {
  return <DrawerHeaderFrame>{children}</DrawerHeaderFrame>
}

function Footer({ children }: { children: React.ReactNode }) {
  return <DrawerFooterFrame>{children}</DrawerFooterFrame>
}

function Title({ children }: { children: React.ReactNode }) {
  const { titleId } = React.useContext(DrawerContext)
  return (
    <h2
      id={titleId}
      style={{
        fontSize: 'var(--fontSize-7, 24px)',
        fontWeight: '600',
        fontFamily: 'var(--font-heading)',
        color: 'var(--color)',
        margin: 0,
      }}
    >
      {children}
    </h2>
  )
}

function Description({ children }: { children: React.ReactNode }) {
  const { descriptionId } = React.useContext(DrawerContext)
  return (
    <p
      id={descriptionId}
      style={{
        fontSize: 'var(--fontSize-3, 14px)',
        color: 'var(--colorSubtitle)',
        fontFamily: 'var(--font-body)',
        margin: 0,
      }}
    >
      {children}
    </p>
  )
}

function Close({ children }: { children: React.ReactNode }) {
  const { onClose } = React.useContext(DrawerContext)
  return (
    <span onClick={onClose} style={{ display: 'inline-flex', cursor: 'pointer' }}>
      {children}
    </span>
  )
}

export const Drawer = {
  Root,
  Trigger,
  Content,
  Header,
  Footer,
  Title,
  Description,
  Close,
}
