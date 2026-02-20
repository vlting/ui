import {
  blue,
  gray,
  green,
  orange,
  pink,
  purple,
  red,
  yellow,
} from '@tamagui/colors'

export const color = {
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',

  // Color scales from @tamagui/colors
  ...blue,
  ...gray,
  ...green,
  ...orange,
  ...pink,
  ...purple,
  ...red,
  ...yellow,
} as const
