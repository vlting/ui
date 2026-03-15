import { styled } from '../../config'

export const Box = styled('div', {
  stl: {},
  variants: {
    centered: {
      true: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    },
  },
  styleName: 'Box',
})
