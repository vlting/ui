import { styled } from '../../config'

export const Heading = styled('h1', {
  stl: {
    color: '$defaultHeading',
    typo: '$heading',
  },
  variants: {
    flat: {
      true: {
        mb: '$0',
      },
    },
  },
  styleName: 'Heading',
})
