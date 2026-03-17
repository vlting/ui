import type { ComponentPropsWithRef } from 'react'
import { styled } from '../../stl-react/src/config'

// ─── Alert ──────────────────────────────────────────────────────────────────

const AlertRoot = styled('div', {
  stl: {
    display: 'flex',
    alignItems: 'start',
    gap: '$16',
    px: '$20',
    py: '$16',
    borderRadius: '$field',
    fontFamily: '$body',
  },
  variants: {
    theme: {
      primary: { bg: '$primary3', border: '$primary', color: '$primaryText3' },
      secondary: { bg: '$secondary3', border: '$secondary', color: '$secondaryText3' },
      neutral: { bg: '$neutral3', border: '$neutral', color: '$neutralText3' },
      success: { bg: '$success3', border: '$success', color: '$successText3' },
      warning: { bg: '$warning3', border: '$warning', color: '$warningText3' },
      error: { bg: '$error3', border: '$error', color: '$errorText3' },
      info: { bg: '$info3', border: '$info', color: '$infoText3' },
    },
    variant: {
      border: {
        borderBlockStartWidth: '$widthMin',
        borderBlockEndWidth: '$widthMin',
        borderInlineStartWidth: '$widthMin',
        borderInlineEndWidth: '$widthMin',
      },
      'subtle-border': {
        borderBlockStartWidth: '$widthMin',
        borderBlockEndWidth: '$widthMin',
        borderInlineStartWidth: '$widthMin',
        borderInlineEndWidth: '$widthMin',
      },
      borderless: { border: 'none' },
      'high-contrast': { border: 'none' },
    },
    floating: {
      true: { boxShadow: '$md' },
    },
  },
  compoundVariants: [
    { when: { variant: 'subtle-border', theme: 'primary' }, stl: { border: '$primaryMin', borderBlockStartWidth: '$widthMin', borderBlockEndWidth: '$widthMin', borderInlineStartWidth: '$widthMin', borderInlineEndWidth: '$widthMin' } },
    { when: { variant: 'subtle-border', theme: 'secondary' }, stl: { border: '$secondaryMin', borderBlockStartWidth: '$widthMin', borderBlockEndWidth: '$widthMin', borderInlineStartWidth: '$widthMin', borderInlineEndWidth: '$widthMin' } },
    { when: { variant: 'subtle-border', theme: 'neutral' }, stl: { border: '$neutralMin', borderBlockStartWidth: '$widthMin', borderBlockEndWidth: '$widthMin', borderInlineStartWidth: '$widthMin', borderInlineEndWidth: '$widthMin' } },
    { when: { variant: 'subtle-border', theme: 'success' }, stl: { border: '$successMin', borderBlockStartWidth: '$widthMin', borderBlockEndWidth: '$widthMin', borderInlineStartWidth: '$widthMin', borderInlineEndWidth: '$widthMin' } },
    { when: { variant: 'subtle-border', theme: 'warning' }, stl: { border: '$warningMin', borderBlockStartWidth: '$widthMin', borderBlockEndWidth: '$widthMin', borderInlineStartWidth: '$widthMin', borderInlineEndWidth: '$widthMin' } },
    { when: { variant: 'subtle-border', theme: 'error' }, stl: { border: '$errorMin', borderBlockStartWidth: '$widthMin', borderBlockEndWidth: '$widthMin', borderInlineStartWidth: '$widthMin', borderInlineEndWidth: '$widthMin' } },
    { when: { variant: 'subtle-border', theme: 'info' }, stl: { border: '$infoMin', borderBlockStartWidth: '$widthMin', borderBlockEndWidth: '$widthMin', borderInlineStartWidth: '$widthMin', borderInlineEndWidth: '$widthMin' } },
    { when: { variant: 'high-contrast', theme: 'primary' }, stl: { bg: '$primary9', color: '$primaryText9' } },
    { when: { variant: 'high-contrast', theme: 'secondary' }, stl: { bg: '$secondary9', color: '$secondaryText9' } },
    { when: { variant: 'high-contrast', theme: 'neutral' }, stl: { bg: '$neutral9', color: '$neutralText9' } },
    { when: { variant: 'high-contrast', theme: 'success' }, stl: { bg: '$success9', color: '$successText9' } },
    { when: { variant: 'high-contrast', theme: 'warning' }, stl: { bg: '$warning9', color: '$warningText9' } },
    { when: { variant: 'high-contrast', theme: 'error' }, stl: { bg: '$error9', color: '$errorText9' } },
    { when: { variant: 'high-contrast', theme: 'info' }, stl: { bg: '$info9', color: '$infoText9' } },
  ],
  defaultVariants: { theme: 'primary', variant: 'borderless' },
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
  stl: { display: 'flex', alignItems: 'center', flexShrink: '0', height: '$20' },
  styleName: 'AlertIcon',
})

const AlertContent = styled('div', {
  stl: { display: 'flex', flexDirection: 'column', gap: '$4', flex: '1' },
  styleName: 'AlertContent',
})

export const Alert = { Root: AlertRoot, Title: AlertTitle, Description: AlertDescription, Icon: AlertIcon, Content: AlertContent }

export type AlertProps = ComponentPropsWithRef<typeof AlertRoot>
