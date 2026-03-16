import type { ComponentPropsWithRef } from 'react'
import { styled } from '../../stl-react/src/config'

// ─── Alert ──────────────────────────────────────────────────────────────────

const AlertRoot = styled('div', {
  stl: {
    display: 'flex',
    gap: '$12',
    p: '$16',
    borderRadius: '$field',
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
    appearance: {
      subtle: {},
      normal: {},
      borderless: { border: 'none' },
      'high-contrast': { border: 'none' },
    },
  },
  compoundVariants: [
    { when: { appearance: 'subtle', theme: 'primary' }, stl: { border: '$primaryMin' } },
    { when: { appearance: 'subtle', theme: 'secondary' }, stl: { border: '$secondaryMin' } },
    { when: { appearance: 'subtle', theme: 'tertiary' }, stl: { border: '$tertiaryMin' } },
    { when: { appearance: 'subtle', theme: 'success' }, stl: { border: '$successMin' } },
    { when: { appearance: 'subtle', theme: 'warning' }, stl: { border: '$warningMin' } },
    { when: { appearance: 'subtle', theme: 'error' }, stl: { border: '$errorMin' } },
    { when: { appearance: 'subtle', theme: 'info' }, stl: { border: '$infoMin' } },
    { when: { appearance: 'high-contrast', theme: 'primary' }, stl: { bg: '$primary9', color: '$primaryText9' } },
    { when: { appearance: 'high-contrast', theme: 'secondary' }, stl: { bg: '$secondary9', color: '$secondaryText9' } },
    { when: { appearance: 'high-contrast', theme: 'tertiary' }, stl: { bg: '$tertiary9', color: '$tertiaryText9' } },
    { when: { appearance: 'high-contrast', theme: 'success' }, stl: { bg: '$success9', color: '$successText9' } },
    { when: { appearance: 'high-contrast', theme: 'warning' }, stl: { bg: '$warning9', color: '$warningText9' } },
    { when: { appearance: 'high-contrast', theme: 'error' }, stl: { bg: '$error9', color: '$errorText9' } },
    { when: { appearance: 'high-contrast', theme: 'info' }, stl: { bg: '$info9', color: '$infoText9' } },
  ],
  defaultVariants: { theme: 'primary', appearance: 'borderless' },
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
export type AlertAppearance = NonNullable<AlertProps['appearance']>
