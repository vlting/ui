import type React from 'react'
import { createContext, useCallback, useContext, useId, useRef, useState } from 'react'
import { styled } from '../../stl-react/src/config'

const TooltipContentFrame = styled(
  'div',
  {
    position: 'absolute',
    zIndex: '50',
    backgroundColor: 'var(--color11)',
    borderRadius: '6px',
    paddingLeft: '8px',
    paddingRight: '8px',
    paddingTop: '4px',
    paddingBottom: '4px',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    transition: 'opacity var(--stl-animation-fastDuration) ease',
  },
  'TooltipContent',
)

const TooltipText = styled(
  'span',
  {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--fontSize-2, 12px)',
    color: 'var(--color1)',
  },
  'TooltipText',
)

interface TooltipProviderContextValue {
  delay: number
}

const TooltipProviderContext = createContext<TooltipProviderContextValue>({ delay: 200 })

export interface TooltipProviderProps {
  children: React.ReactNode
  delay?: number
}

export function TooltipProvider({ children, delay = 200 }: TooltipProviderProps) {
  return (
    <TooltipProviderContext.Provider value={{ delay }}>
      {children}
    </TooltipProviderContext.Provider>
  )
}

const POSITION_STYLES: Record<string, React.CSSProperties> = {
  top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 4 },
  bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 4 },
  left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: 4 },
  right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 4 },
}

export interface TooltipProps {
  children: React.ReactNode
  content: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  delay?: number
}

export function Tooltip({
  children,
  content,
  side = 'top',
  sideOffset = 4,
  delay: propDelay,
}: TooltipProps) {
  const { delay: contextDelay } = useContext(TooltipProviderContext)
  const delay = propDelay ?? contextDelay
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const id = useId()

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay)
  }, [delay])

  const hide = useCallback(() => {
    clearTimeout(timeoutRef.current)
    setVisible(false)
  }, [])

  const positionStyle = { ...POSITION_STYLES[side] }
  if (side === 'top' || side === 'bottom') {
    const key = side === 'top' ? 'marginBottom' : 'marginTop'
    positionStyle[key] = sideOffset
  } else {
    const key = side === 'left' ? 'marginRight' : 'marginLeft'
    positionStyle[key] = sideOffset
  }

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span aria-describedby={visible ? `tooltip-${id}` : undefined}>{children}</span>
      {visible && (
        <TooltipContentFrame role="tooltip" id={`tooltip-${id}`} style={positionStyle}>
          <TooltipText>{content}</TooltipText>
        </TooltipContentFrame>
      )}
    </span>
  )
}
