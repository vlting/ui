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
      primary: { bg: '$primary3', border: '$primary9', color: '$primaryText3' },
      secondary: { bg: '$secondary3', border: '$secondary9', color: '$secondaryText3' },
      neutral: { bg: '$neutral3', border: '$neutral9', color: '$neutralText3' },
      success: { bg: '$success3', border: '$success9', color: '$successText3' },
      warning: { bg: '$warning3', border: '$warning9', color: '$warningText3' },
      error: { bg: '$error3', border: '$error9', color: '$errorText3' },
      info: { bg: '$info3', border: '$info9', color: '$infoText3' },
    },
    variant: {
      outline: {
        borderBlockStartWidth: '$widthMin',
        borderBlockEndWidth: '$widthMin',
        borderInlineStartWidth: '$widthMin',
        borderInlineEndWidth: '$widthMin',
      },
      outlineMin: {
        borderBlockStartWidth: '$widthMin',
        borderBlockEndWidth: '$widthMin',
        borderInlineStartWidth: '$widthMin',
        borderInlineEndWidth: '$widthMin',
      },
      subtle: { border: 'none' },
      solid: { border: 'none' },
    },
    floating: {
      true: { boxShadow: '$md' },
    },
  },
  compoundVariants: [
    { when: { variant: 'outlineMin', theme: 'primary' }, stl: { border: '$primary5' } },
    { when: { variant: 'outlineMin', theme: 'secondary' }, stl: { border: '$secondary5' } },
    { when: { variant: 'outlineMin', theme: 'neutral' }, stl: { border: '$neutral5' } },
    { when: { variant: 'outlineMin', theme: 'success' }, stl: { border: '$success5' } },
    { when: { variant: 'outlineMin', theme: 'warning' }, stl: { border: '$warning5' } },
    { when: { variant: 'outlineMin', theme: 'error' }, stl: { border: '$error5' } },
    { when: { variant: 'outlineMin', theme: 'info' }, stl: { border: '$info5' } },
    { when: { variant: 'solid', theme: 'primary' }, stl: { bg: '$primary9', color: '$primaryText9' } },
    { when: { variant: 'solid', theme: 'secondary' }, stl: { bg: '$secondary9', color: '$secondaryText9' } },
    { when: { variant: 'solid', theme: 'neutral' }, stl: { bg: '$neutral9', color: '$neutralText9' } },
    { when: { variant: 'solid', theme: 'success' }, stl: { bg: '$success9', color: '$successText9' } },
    { when: { variant: 'solid', theme: 'warning' }, stl: { bg: '$warning9', color: '$warningText9' } },
    { when: { variant: 'solid', theme: 'error' }, stl: { bg: '$error9', color: '$errorText9' } },
    { when: { variant: 'solid', theme: 'info' }, stl: { bg: '$info9', color: '$infoText9' } },
  ],
  defaultVariants: { theme: 'primary', variant: 'subtle' },
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
