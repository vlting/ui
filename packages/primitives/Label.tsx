import type React from 'react'
import { styled } from '../stl-react/src/config'

const LabelFrame = styled(
  'label',
  { fontFamily: '$body', display: 'inline-flex', alignItems: 'center', gap: '$1' },
  {
    size: {
      sm: { fontSize: '$12' },
      md: { fontSize: '$14' },
      lg: { fontSize: '$16' },
    },
  },
  'Label',
)

export interface LabelProps {
  children: React.ReactNode
  htmlFor?: string
  size?: 'sm' | 'md' | 'lg'
  required?: boolean
}

export function Label({ children, htmlFor, size = 'md', required }: LabelProps) {
  return (
    <LabelFrame htmlFor={htmlFor} size={size}>
      {children}
      {required && (
        <span style={{ color: 'var(--stl-color-error9)' }}>
          {' '}
          *
        </span>
      )}
    </LabelFrame>
  )
}
