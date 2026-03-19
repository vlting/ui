import { styled } from '../../config'

const TEXT_STYLES = {
  fontFamily: '$body',
  color: '$color',
  fontSize: '$p',
  fontWeight: '$400',
  lineHeight: '$body',
} as const

export const getTextStyles = () => TEXT_STYLES

const TextBase = styled('p', getTextStyles(), {
  name: 'Text',
  variants: {
    size: {
      xs: { fontSize: '$12' },
      sm: { fontSize: '$14' },
      md: { fontSize: '$16' },
      lg: { fontSize: '$18' },
      xl: { fontSize: '$21' },
    },
    tone: {
      neutral: { color: '$color' },
      muted: { color: '$neutralText12' },
      primary: { color: '$primary10' },
      success: { color: '$forest10' },
      warning: { color: '$amber10' },
      danger: { color: '$tomato10' },
    },
    weight: {
      light: { fontWeight: '$300' },
      normal: { fontWeight: '$400' },
      medium: { fontWeight: '$500' },
      semibold: { fontWeight: '$600' },
      bold: { fontWeight: '$700' },
    },
  },
})

const Small = styled('small', {
  ...TEXT_STYLES,
  fontSize: '$14',
}, { name: 'Text.Small' })

const Code = styled('code', {
  ...TEXT_STYLES,
  fontFamily: '$code',
  fontSize: '$14',
  bg: '$neutralAlpha2',
  px: '$4',
  py: '$2',
  radius: '$snippet',
}, { name: 'Text.Code' })

export const Text = Object.assign(TextBase, { Small, Code })

export interface TextProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  tone?: 'neutral' | 'muted' | 'primary' | 'success' | 'warning' | 'danger'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
}
