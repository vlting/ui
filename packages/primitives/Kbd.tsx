import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'

const KbdFrame = styledHtml('kbd', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: '$mono',
  backgroundColor: '$color2',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '$borderColor',
  borderBottomWidth: 2,
  color: '$color',

  variants: {
    size: {
      sm: {
        fontSize: '$1',
        lineHeight: '$1',
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 1,
        paddingBottom: 1,
        borderRadius: '$2',
        minWidth: 20,
      },
      md: {
        fontSize: '$2',
        lineHeight: '$1',
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: '$2',
        minWidth: 24,
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
} as any)

// Cast for JSX usage — v2 RC GetFinalProps bug
const KbdJsx = KbdFrame as ComponentType<Record<string, unknown>>

export interface KbdProps {
  children: string
  size?: 'sm' | 'md'
}

export function Kbd({ children, size = 'md' }: KbdProps) {
  return <KbdJsx size={size}>{children}</KbdJsx>
}
