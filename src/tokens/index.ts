import { createTokens } from '@tamagui/core'
import { borderWidth } from './borderWidth'
import { color } from './color'
import { radius } from './radius'
import { size } from './size'
import { space } from './space'
import { zIndex } from './zIndex'

export const tokens = createTokens({
  size,
  space,
  radius,
  color,
  zIndex,
  borderWidth,
})
