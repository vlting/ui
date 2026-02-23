import React, { useCallback, useId, useRef, useState } from 'react'
import { Text, View, styled } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
const TooltipContent = styled(View, {
  backgroundColor: '$color11',
  borderRadius: '$3',
  paddingHorizontal: '$2',
  paddingVertical: '$1',
  position: 'absolute',
  zIndex: 1000,
  pointerEvents: 'none',
  animation: 'instant',
})

// @ts-expect-error Tamagui v2 RC
const TooltipText = styled(Text, {
  fontFamily: '$body',
  fontSize: '$2',
  color: '$color1',
})

export interface TooltipProps {
  children: React.ReactNode
  content: string
  side?: 'top' | 'bottom'
  delay?: number
}

export function Tooltip({ children, content, side = 'top', delay = 200 }: TooltipProps) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const tooltipId = useId()

  const handleEnter = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpen(true), delay)
  }, [delay])

  const handleLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(false)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    },
    [open],
  )

  const positionStyle =
    side === 'top'
      ? { bottom: '100%', marginBottom: '$0.5' as const, left: '50%', translateX: '-50%' }
      : { top: '100%', marginTop: '$0.5' as const, left: '50%', translateX: '-50%' }

  return (
    // @ts-expect-error Tamagui v2 RC
    <View
      position="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      onKeyDown={handleKeyDown}
      aria-describedby={tooltipId}
    >
      {children}
      {/* @ts-expect-error Tamagui v2 RC */}
      <TooltipContent
        {...positionStyle}
        id={tooltipId}
        role="tooltip"
        display={open ? 'flex' : 'none'}
      >
        {/* @ts-expect-error Tamagui v2 RC */}
        <TooltipText>{content}</TooltipText>
      </TooltipContent>
    </View>
  )
}
