import { styled } from '../../config'

const TEXT_STYLES = {
  fontFamily: '$body',
  color: '$color',
  fontSize: '$p',
  fontWeight: '$400',
  lineHeight: '$body',
} as const

export const getTextStyles = () => TEXT_STYLES

export const Text = styled('p', {
  stl: getTextStyles(),
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
      muted: { color: '$secondaryText12' },
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
  styleName: 'Text',
})

export interface TextProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  tone?: 'neutral' | 'muted' | 'primary' | 'success' | 'warning' | 'danger'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
}
