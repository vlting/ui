import type React from 'react'
import { styled } from '../../config'

const BadgeFrame = styled('span', {
  stl: {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: '$body',
    fontSize: '$12',
    fontWeight: '$600',
    borderRadius: '$full',
    overflow: 'hidden',
    alignSelf: 'self-start',
  },
  variants: {
    variant: {
      default: { bg: '$primary6', color: '$white' },
      solid: { bg: '$primary6', color: '$white' },
      secondary: { bg: '$surface2', color: '$color' },
      destructive: { bg: '$red10', color: '$white' },
      outline: {
        bg: 'transparent',
        borderWidth: '$widthBase',
        borderStyle: '$styleDefault',
        borderColor: '$primaryMin',
        color: '$color',
      },
      subtle: { bg: '$surface2', color: '$tertiary11' },
    },
    size: {
      sm: { fontSize: '$12', px: '$1', py: '0px' },
      md: { fontSize: '$12', px: '$2', py: '$1' },
      lg: { fontSize: '$14', px: '$3', py: '$1' },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
  styleName: 'Badge',
})

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'solid' | 'secondary' | 'destructive' | 'outline' | 'subtle'
  size?: 'sm' | 'md' | 'lg'
}

export { BadgeFrame as Badge }
