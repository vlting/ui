import { styled } from '../stl-react/src/config'

export const Box = styled(
  'div',
  {
    stl: {},
    variants: {
      centered: {
        true: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
      },
    },
    styleName: 'Box',
  },
)
