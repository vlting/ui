import { Popover as TamaguiPopover } from '@tamagui/popover'
import type React from 'react'
import type { ComponentType } from 'react'
import { YStack, styled } from 'tamagui'

const StyledContent = styled(YStack, {
  backgroundColor: '$background',
  borderRadius: '$4',
  borderWidth: 1,
  borderColor: '$borderColor',
  padding: '$3',
  elevation: '$4',
  // @ts-expect-error Tamagui v2 RC
  animation: 'medium',
  // @ts-expect-error Tamagui v2 RC
  enterStyle: { opacity: 0, scale: 0.95, y: -4 },
  // @ts-expect-error Tamagui v2 RC
  exitStyle: { opacity: 0, scale: 0.95, y: -4 },
})

// Tamagui v2 RC GetProps bug — cast for JSX usage
const PopoverRoot = TamaguiPopover as ComponentType<Record<string, unknown>>
const PopoverTrigger = TamaguiPopover.Trigger as ComponentType<Record<string, unknown>>
const PopoverAnchor = TamaguiPopover.Anchor as ComponentType<Record<string, unknown>>
const PopoverArrow = TamaguiPopover.Arrow as ComponentType<Record<string, unknown>>
const PopoverClose = TamaguiPopover.Close as ComponentType<Record<string, unknown>>
const ContentFrame = StyledContent as ComponentType<Record<string, unknown>>

export interface PopoverRootProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  placement?: 'top' | 'bottom' | 'left' | 'right'
  offset?: number
  hoverable?: boolean
}

function Root({
  children,
  open,
  defaultOpen,
  onOpenChange,
  placement = 'bottom',
  offset,
  hoverable,
}: PopoverRootProps) {
  return (
    <PopoverRoot
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      placement={placement}
      offset={offset ?? 4}
      hoverable={hoverable}
    >
      {children}
    </PopoverRoot>
  )
}

function Trigger({ children }: { children: React.ReactNode }) {
  return <PopoverTrigger asChild>{children}</PopoverTrigger>
}

function Anchor({ children }: { children: React.ReactNode }) {
  return <PopoverAnchor asChild>{children}</PopoverAnchor>
}

interface PopoverContentProps {
  children: React.ReactNode
}

const PopoverContentJsx = TamaguiPopover.Content as ComponentType<Record<string, unknown>>

function Content({ children }: PopoverContentProps) {
  return (
    <PopoverContentJsx>
      <PopoverArrow
        borderWidth={1}
        borderColor="$borderColor"
        backgroundColor="$background"
        size="$1"
      />
      <ContentFrame>{children}</ContentFrame>
    </PopoverContentJsx>
  )
}

function Arrow() {
  return <PopoverArrow borderWidth={1} borderColor="$borderColor" />
}

function Close({ children }: { children?: React.ReactNode }) {
  return <PopoverClose asChild>{children}</PopoverClose>
}

export const Popover = { Root, Trigger, Anchor, Content, Arrow, Close }
