import type { ComponentPropsWithRef } from 'react'
import { styled } from '../../stl-react/src/config'

// ─── Alert ──────────────────────────────────────────────────────────────────

const AlertRoot = styled('div', {
  stl: {
    display: 'flex',
    gap: '$12',
    p: '$16',
    borderRadius: '$12',
    borderWidth: '$widthDefault',
    borderStyle: '$styleDefault',
    fontFamily: '$body',
  },
  variants: {
    theme: {
      primary: { bg: '$primary3', border: '$primary', color: '$primaryText3' },
      secondary: { bg: '$secondary3', border: '$secondary', color: '$secondaryText3' },
      tertiary: { bg: '$tertiary3', border: '$tertiary', color: '$tertiaryText3' },
      success: { bg: '$success3', border: '$success', color: '$successText3' },
      warning: { bg: '$warning3', border: '$warning', color: '$warningText3' },
      error: { bg: '$error3', border: '$error', color: '$errorText3' },
      info: { bg: '$info3', border: '$info', color: '$infoText3' },
    },
  },
  defaultVariants: { theme: 'primary' },
  mapProps: (props) => ({
    ...props,
    role: props.theme === 'error' ? 'alert' : 'status',
  }),
  styleName: 'Alert',
})

const AlertTitle = styled('h5', {
  stl: { fontWeight: '$600', fontSize: '$p', m: '$0' },
  styleName: 'AlertTitle',
})

const AlertDescription = styled('p', {
  stl: { fontSize: '$small', m: '$0', opacity: '0.9' },
  styleName: 'AlertDescription',
})

const AlertIcon = styled('span', {
  stl: { display: 'flex', alignItems: 'center', flexShrink: '0' },
  styleName: 'AlertIcon',
})

export const Alert = { Root: AlertRoot, Title: AlertTitle, Description: AlertDescription, Icon: AlertIcon }

export type AlertProps = ComponentPropsWithRef<typeof AlertRoot>
export type AlertTheme = NonNullable<AlertProps['theme']>
