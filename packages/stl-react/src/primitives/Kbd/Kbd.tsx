import { styled } from '../../config'

export const Kbd = styled('kbd', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: '$code',
  bg: '$surface2',
  borderWidth: '$widthBase',
  borderStyle: '$styleDefault',
  borderColor: '$primary1',
  borderBottomWidth: 'medium',
  color: '$neutral12',
}, {
  name: 'Kbd',
  variants: {
    size: {
      sm: {
        fontSize: '$12',
        radius: '$2',
        minWidth: '20px',
        px: '4px',
        py: '1px',
      },
      md: {
        fontSize: '$14',
        radius: '$2',
        minWidth: '24px',
        px: '6px',
        py: '2px',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type KbdProps = { children: string; size?: 'sm' | 'md' }
