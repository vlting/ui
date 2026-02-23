import type React from 'react'
import type { ComponentType } from 'react'
import { Text, styled } from 'tamagui'
import { Tooltip as TamaguiTooltip } from '@tamagui/tooltip'

// @ts-expect-error Tamagui v2 RC
const TooltipText = styled(Text, {
  fontFamily: '$body',
  fontSize: '$2',
  color: '$color1',
})

// Tamagui v2 RC GetProps bug — cast for JSX usage
const TooltipRoot = TamaguiTooltip as ComponentType<Record<string, unknown>>
const TooltipTrigger = TamaguiTooltip.Trigger as ComponentType<Record<string, unknown>>
const TooltipContent = TamaguiTooltip.Content as ComponentType<Record<string, unknown>>
const TooltipArrow = TamaguiTooltip.Arrow as ComponentType<Record<string, unknown>>
const ContentText = TooltipText as ComponentType<Record<string, unknown>>

const SIDE_MAP = {
  top: 'top' as const,
  bottom: 'bottom' as const,
}

export interface TooltipProps {
  children: React.ReactNode
  content: string
  side?: 'top' | 'bottom'
  delay?: number
}

export function Tooltip({ children, content, side = 'top', delay = 200 }: TooltipProps) {
  return (
    <TooltipRoot delay={delay} placement={SIDE_MAP[side]}>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent
        backgroundColor="$color11"
        borderRadius="$3"
        paddingHorizontal="$2"
        paddingVertical="$1"
        zIndex={1000}
        enterStyle={{ opacity: 0, scale: 0.95 }}
        exitStyle={{ opacity: 0, scale: 0.95 }}
        animation="instant"
      >
        <TooltipArrow />
        <ContentText>{content}</ContentText>
      </TooltipContent>
    </TooltipRoot>
  )
}
