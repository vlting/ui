import { styled } from '../../config'

export const SubHeading = styled('h2', {
  stl: {
    color: '$defaultHeading',
    typo: '$subHeading',
  },
  variants: {
    flat: {
      true: {
        mb: '$0',
      },
    },
  },
  styleName: 'SubHeading',
})
