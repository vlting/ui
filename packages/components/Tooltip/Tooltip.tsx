import { Tooltip as TamaguiTooltip, TooltipGroup } from '@tamagui/tooltip'
import type React from 'react'
import type { ComponentType } from 'react'
import { Text, styled } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>

// @ts-expect-error Tamagui v2 RC
const TooltipText = styled(Text, {
  fontFamily: '$body',
  fontSize: '$2',
  color: '$color1',
})

// Tamagui v2 RC GetProps bug — cast for JSX usage
const TooltipRoot = TamaguiTooltip as AnyFC
const TooltipTrigger = TamaguiTooltip.Trigger as AnyFC
const TooltipContent = TamaguiTooltip.Content as AnyFC
const TooltipArrow = TamaguiTooltip.Arrow as AnyFC
const ContentText = TooltipText as AnyFC
const TooltipGroupJsx = TooltipGroup as AnyFC

export interface TooltipProviderProps {
  children: React.ReactNode
  delay?: number
}

export function TooltipProvider({ children, delay = 200 }: TooltipProviderProps) {
  return <TooltipGroupJsx delay={delay}>{children}</TooltipGroupJsx>
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
  sideOffset = 2,
  align = 'center',
  delay = 200,
}: TooltipProps) {
  return (
    <TooltipRoot delay={delay} placement={side}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        backgroundColor="$color11"
        borderRadius="$3"
        paddingHorizontal="$2"
        paddingVertical="$1"
        zIndex="$6"
        enterStyle={{ opacity: 0, scale: 0.95 }}
        exitStyle={{ opacity: 0, scale: 0.95 }}
        animation="instant"
        sideOffset={sideOffset}
        alignOffset={align === 'center' ? 0 : undefined}
      >
        <TooltipArrow size={5} />
        <ContentText>{content}</ContentText>
      </TooltipContent>
    </TooltipRoot>
  )
}
