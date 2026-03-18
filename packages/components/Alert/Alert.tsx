import type { ComponentPropsWithRef } from 'react'
import { styled } from '../../stl-react/src/config'

// ─── Alert ──────────────────────────────────────────────────────────────────

const AlertRoot = styled('div', {
  display: 'flex',
  alignItems: 'start',
  gap: '$16',
  px: '$20',
  py: '$16',
  borderRadius: '$field',
  fontFamily: '$body',
}, {
  name: 'Alert',
  variants: {
    theme: {
      primary: { bg: '$primary3', border: '$primary9' },
      secondary: { bg: '$secondary3', border: '$secondary9' },
      neutral: { bg: '$neutral3', border: '$neutral9' },
      success: { bg: '$success3', border: '$success9' },
      warning: { bg: '$warning3', border: '$warning9' },
      error: { bg: '$error3', border: '$error9' },
      info: { bg: '$info3', border: '$info9' },
    },
    variant: {
      outline: {
        borderBlockStartWidth: '$widthMin',
        borderBlockEndWidth: '$widthMin',
        borderInlineStartWidth: '$widthMin',
        borderInlineEndWidth: '$widthMin',
      },
      subtle: { border: 'none' },
      solid: { border: 'none' },
    },
    elevation: {
      flat: {},
      raised: { boxShadow: '$md' },
    },
  },
  compoundVariants: [
    // ── Outline ──────────────────────────────────────────
    { when: { variant: 'outline', theme: 'primary' }, stl: { border: '$primary5', color: '$primaryText3' } },
    { when: { variant: 'outline', theme: 'secondary' }, stl: { border: '$secondary5', color: '$secondaryText3' } },
    { when: { variant: 'outline', theme: 'neutral' }, stl: { border: '$neutral5', color: '$neutralText3' } },
    { when: { variant: 'outline', theme: 'success' }, stl: { border: '$success5', color: '$successText3' } },
    { when: { variant: 'outline', theme: 'warning' }, stl: { border: '$warning5', color: '$warningText3' } },
    { when: { variant: 'outline', theme: 'error' }, stl: { border: '$error5', color: '$errorText3' } },
    { when: { variant: 'outline', theme: 'info' }, stl: { border: '$info5', color: '$infoText3' } },
    // ── Subtle ───────────────────────────────────────────
    { when: { variant: 'subtle', theme: 'primary' }, stl: { color: '$primaryText3' } },
    { when: { variant: 'subtle', theme: 'secondary' }, stl: { color: '$secondaryText3' } },
    { when: { variant: 'subtle', theme: 'neutral' }, stl: { color: '$neutralText3' } },
    { when: { variant: 'subtle', theme: 'success' }, stl: { color: '$successText3' } },
    { when: { variant: 'subtle', theme: 'warning' }, stl: { color: '$warningText3' } },
    { when: { variant: 'subtle', theme: 'error' }, stl: { color: '$errorText3' } },
    { when: { variant: 'subtle', theme: 'info' }, stl: { color: '$infoText3' } },
    // ── Solid ────────────────────────────────────────────
    { when: { variant: 'solid', theme: 'primary' }, stl: { bg: '$primary9', color: '$primaryText9' } },
    { when: { variant: 'solid', theme: 'secondary' }, stl: { bg: '$secondary9', color: '$secondaryText9' } },
    { when: { variant: 'solid', theme: 'neutral' }, stl: { bg: '$neutral9', color: '$neutralText9' } },
    { when: { variant: 'solid', theme: 'success' }, stl: { bg: '$success9', color: '$successText9' } },
    { when: { variant: 'solid', theme: 'warning' }, stl: { bg: '$warning9', color: '$warningText9' } },
    { when: { variant: 'solid', theme: 'error' }, stl: { bg: '$error9', color: '$errorText9' } },
    { when: { variant: 'solid', theme: 'info' }, stl: { bg: '$info9', color: '$infoText9' } },
  ],
  defaultVariants: { theme: 'primary', variant: 'outline', elevation: 'flat' },
  mapProps: (props: any) => ({
    ...props,
    role: props.theme === 'error' ? 'alert' : 'status',
  }),
})

const AlertTitle = styled('h5', { fontWeight: '$600', fontSize: '$p', m: '$0' }, { name: 'AlertTitle' })

const AlertDescription = styled('p', { fontSize: '$small', m: '$0', opacity: '0.9' }, { name: 'AlertDescription' })

const AlertIcon = styled('span', { display: 'flex', alignItems: 'center', flexShrink: '0', height: '$20' }, { name: 'AlertIcon' })

const AlertContent = styled('div', { display: 'flex', flexDirection: 'column', gap: '$4', flex: '1' }, { name: 'AlertContent' })

export const Alert = { Root: AlertRoot, Title: AlertTitle, Description: AlertDescription, Icon: AlertIcon, Content: AlertContent }

export type AlertProps = ComponentPropsWithRef<typeof AlertRoot>
