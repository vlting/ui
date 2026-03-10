import React, { useCallback, useRef, useState } from 'react'
import { styled } from '../../stl-react/src/config'

const ContentFrame = styled(
  'div',
  {
    backgroundColor: '$background',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '$borderColor',
    borderRadius: '$4',
    padding: '14px',
    zIndex: '100',
    minWidth: '200px',
    position: 'absolute',
  },
  'HoverCardContent',
)

export interface HoverCardRootProps {
  children: React.ReactNode
  openDelay?: number
  closeDelay?: number
}

export interface HoverCardContentProps {
  children: React.ReactNode
  side?: 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
}

const HoverCardContext = React.createContext<{
  open: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}>({ open: false, onMouseEnter: () => {}, onMouseLeave: () => {} })

function Root({ children, openDelay = 700, closeDelay = 300 }: HoverCardRootProps) {
  const [open, setOpen] = useState(false)
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const onMouseEnter = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    openTimer.current = setTimeout(() => setOpen(true), openDelay)
  }, [openDelay])

  const onMouseLeave = useCallback(() => {
    if (openTimer.current) {
      clearTimeout(openTimer.current)
      openTimer.current = null
    }
    closeTimer.current = setTimeout(() => setOpen(false), closeDelay)
  }, [closeDelay])

  return (
    <HoverCardContext.Provider value={{ open, onMouseEnter, onMouseLeave }}>
      <div style={{ position: 'relative', display: 'inline-flex' }}>{children}</div>
    </HoverCardContext.Provider>
  )
}

function Trigger({ children }: { children: React.ReactNode }) {
  const { onMouseEnter, onMouseLeave } = React.useContext(HoverCardContext)

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ display: 'inline-flex', position: 'relative' }}
    >
      {children}
    </div>
  )
}

const SIDE_STYLES: Record<string, React.CSSProperties> = {
  top: { bottom: '100%', marginBottom: '4px' },
  bottom: { top: '100%', marginTop: '4px' },
}

const ALIGN_STYLES: Record<string, React.CSSProperties> = {
  start: { left: 0 },
  center: { left: '50%', transform: 'translateX(-50%)' },
  end: { right: 0 },
}

function Content({ children, side = 'bottom', align = 'center' }: HoverCardContentProps) {
  const { open, onMouseEnter, onMouseLeave } = React.useContext(HoverCardContext)

  if (!open) return null

  return (
    <ContentFrame
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="tooltip"
      style={{
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        ...SIDE_STYLES[side],
        ...ALIGN_STYLES[align],
      }}
    >
      {children}
    </ContentFrame>
  )
}

export const HoverCard = { Root, Trigger, Content }
