import { styled } from '../../config'

export const Blockquote = styled('blockquote', {
  fontFamily: '$body',
  fontSize: '$p',
  lineHeight: '$body',
  fontStyle: 'italic',
  color: '$color',
  margin: '0',
  pl: '$16',
  borderLeftWidth: '$widthBase',
  borderLeftStyle: '$styleDefault',
  borderLeftColor: '$borderColor',
}, { name: 'Blockquote' })
