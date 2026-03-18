import { styled } from '../../config'

export const Box = styled('div', {}, {
  name: 'Box',
  variants: {
    centered: {
      true: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    },
  },
})
