import type { ComponentProps } from 'react'
import { styled } from '../stl-react/src/config'

const BadgeFrame = styled(
  'span',
  {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: '$body',
    fontSize: '$12',
    fontWeight: '$600',
    borderRadius: '$full',
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  {
    variant: {
      default: { backgroundColor: '$primary6', color: '$white' },
      solid: { backgroundColor: '$primary6', color: '$white' },
      secondary: { backgroundColor: '$surface2', color: '$color' },
      destructive: { backgroundColor: '$red10', color: '$white' },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '$borderColor',
        color: '$color',
      },
      subtle: { backgroundColor: '$surface2', color: '$tertiary11' },
    },
    size: {
      sm: {
        fontSize: '$12',
        paddingLeft: '$1',
        paddingRight: '$1',
        paddingTop: '0px',
        paddingBottom: '0px',
      },
      md: {
        fontSize: '$12',
        paddingLeft: '$2',
        paddingRight: '$2',
        paddingTop: '$1',
        paddingBottom: '$1',
      },
      lg: {
        fontSize: '$14',
        paddingLeft: '$3',
        paddingRight: '$3',
        paddingTop: '$1',
        paddingBottom: '$1',
      },
    },
  },
  'Badge',
)

export interface BadgeProps extends ComponentProps<typeof BadgeFrame> {
  variant?: 'default' | 'solid' | 'secondary' | 'destructive' | 'outline' | 'subtle'
  size?: 'sm' | 'md' | 'lg'
}

export function Badge({ variant = 'default', size = 'md', ...props }: BadgeProps) {
  return <BadgeFrame variant={variant} size={size} {...props} />
}
