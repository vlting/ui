import { styled } from '../../config'

export const Skeleton = styled('div', {
  stl: {
    bg: '$surface3',
    radius: '$2',
    overflow: 'hidden',
    animation: '$pulse',
    lowMotion: {
      animation: 'none',
    },
  },
  variants: {
    circle: {
      true: { radius: '$full' },
    },
  },
  mapProps: (props) => ({
    ...props,
    'aria-hidden': true,
  }),
  styleName: 'Skeleton',
})

export type SkeletonProps = { circle?: boolean }
