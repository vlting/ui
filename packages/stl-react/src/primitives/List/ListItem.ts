import { styled } from '../../config'
import { getTextStyles } from '../Text/Text'

export const ListItem = styled('li', {
  stl: {
    ...getTextStyles(),
    lineHeight: '$listItem',
  },
  styleName: 'ListItem',
})
