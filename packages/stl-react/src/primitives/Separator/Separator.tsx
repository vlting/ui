import { forwardRef } from 'react'
import { styled } from '../../config'

const SeparatorBase = styled('hr', {
  border: 'none',
  margin: '$0',
  height: '1px',
  width: '100%',
  backgroundColor: '$neutralAlpha3',
}, {
  name: 'Separator',
  variants: {
    orientation: {
      horizontal: { height: '1px', width: '100%', marginTop: '$2', marginBottom: '$2' },
      vertical: { width: '1px', height: '100%', marginLeft: '$2', marginRight: '$2' },
    },
  },
})

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  className?: string
  style?: React.CSSProperties
}

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(
  ({ orientation = 'horizontal', decorative = false, ...rest }, ref) => {
    return (
      <SeparatorBase
        ref={ref}
        orientation={orientation}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={decorative ? undefined : orientation}
        {...rest}
      />
    )
  },
)
Separator.displayName = 'Separator'
