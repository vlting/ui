import { styled } from '../../config'

export const Skeleton = styled('div', {
  bg: '$surface3',
  radius: '$2',
  overflow: 'hidden',
  animation: '$pulse',
  lowMotion: {
    animation: 'none',
  },
}, {
  name: 'Skeleton',
  variants: {
    circle: {
      true: { radius: '$full' },
    },
  },
  mapProps: (props) => ({
    ...props,
    'aria-hidden': true,
  }),
})

export type SkeletonProps = { circle?: boolean }
