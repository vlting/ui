import type { ComponentProps } from 'react'
import { styled } from '../stl-react/src/config'

const TextFrame = styled(
  'p',
  { fontFamily: '$body', color: '$color', fontSize: '$16', lineHeight: '$body' },
  {
    size: {
      xs: { fontSize: '$12' },
      sm: { fontSize: '$14' },
      md: { fontSize: '$16' },
      lg: { fontSize: '$18' },
      xl: { fontSize: '$21' },
    },
    tone: {
      neutral: { color: '$color' },
      muted: { color: '$secondaryText12' },
      primary: { color: '$primary10' },
      success: { color: '$green10' },
      warning: { color: '$orange10' },
      danger: { color: '$red10' },
    },
    weight: {
      light: { fontWeight: '$300' },
      normal: { fontWeight: '$400' },
      medium: { fontWeight: '$500' },
      semibold: { fontWeight: '$600' },
      bold: { fontWeight: '$700' },
    },
  },
  'Text',
)

export interface TextProps extends ComponentProps<typeof TextFrame> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  tone?: 'neutral' | 'muted' | 'primary' | 'success' | 'warning' | 'danger'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
}

export function Text({ size = 'md', ...props }: TextProps) {
  return <TextFrame size={size} {...props} />
}
