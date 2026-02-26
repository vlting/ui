import type { ComponentType } from 'react'
import { View, styled } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>

const DividerFrame = styled(View, {
  backgroundColor: '$borderColor',
  flexShrink: 0,

  variants: {
    orientation: {
      horizontal: {
        height: 1,
        width: '100%',
        marginVertical: '$2',
      },
      vertical: {
        width: 1,
        height: '100%',
        marginHorizontal: '$2',
      },
    },
  } as const,

  defaultVariants: {
    orientation: 'horizontal',
  },
} as any)

const DividerFrameJsx = DividerFrame as AnyFC

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
}

export function Divider({ orientation = 'horizontal' }: DividerProps) {
  return (
    <DividerFrameJsx
      orientation={orientation}
      role="separator"
      aria-orientation={orientation}
    />
  )
}
