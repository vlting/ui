import { styled } from '../../config'

export const Blockquote = styled('blockquote', {
  fontFamily: '$body',
  fontSize: '$p',
  lineHeight: '$body',
  fontStyle: 'italic',
  color: '$neutral12',
  margin: '0',
  bg: '$neutralAlpha2',
  radius: '$snippet',
  py: '$12',
  pl: '$16',
  pr: '$16',
  borderLeftWidth: '$widthBase',
  borderLeftStyle: '$styleDefault',
  borderLeftColor: '$neutral4',
}, { name: 'Blockquote' })
