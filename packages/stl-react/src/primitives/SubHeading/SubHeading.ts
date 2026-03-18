import { styled } from '../../config'

export const SubHeading = styled('h2', {
  color: '$defaultHeading',
  typo: '$subHeading',
}, {
  name: 'SubHeading',
  variants: {
    flat: {
      true: {
        mb: '$0',
      },
    },
  },
})
