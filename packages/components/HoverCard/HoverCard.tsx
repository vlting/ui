import type { ComponentType } from 'react'
import React, { useCallback, useRef, useState } from 'react'
import { View, styled } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>

// @ts-expect-error Tamagui v2 RC
const ContentFrame = styled(View, {
  backgroundColor: '$background',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$5',
  padding: '$3.5',
  zIndex: 50,
  minWidth: 256,
})

const ContentFrameJsx = ContentFrame as AnyFC
const ViewJsx = View as AnyFC

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
      <ViewJsx position="relative" display="inline-flex">{children}</ViewJsx>
    </HoverCardContext.Provider>
  )
}

function Trigger({ children }: { children: React.ReactNode }) {
  const { onMouseEnter, onMouseLeave } = React.useContext(HoverCardContext)

  return (
    <ViewJsx
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      display="inline-flex"
    >
      {children}
    </ViewJsx>
  )
}

const SIDE_STYLES = {
  top: { bottom: '100%', marginBottom: 8 },
  bottom: { top: '100%', marginTop: 8 },
} as const

const ALIGN_STYLES = {
  start: { left: 0 },
  center: { left: '50%', transform: 'translateX(-50%)' },
  end: { right: 0 },
} as const

function Content({ children, side = 'bottom', align = 'center' }: HoverCardContentProps) {
  const { open, onMouseEnter, onMouseLeave } = React.useContext(HoverCardContext)

  if (!open) return null

  return (
    <ContentFrameJsx
      position="absolute"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="tooltip"
      style={{
        ...SIDE_STYLES[side],
        ...ALIGN_STYLES[align],
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      }}
    >
      {children}
    </ContentFrameJsx>
  )
}

export const HoverCard = { Root, Trigger, Content }
