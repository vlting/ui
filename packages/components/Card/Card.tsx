import type { ComponentPropsWithRef } from 'react'
import { styled } from '../../stl-react/src/config'

// ─── Card ───────────────────────────────────────────────────────────────────

const CardRoot = styled('article', {
  radius: '$card',
  overflow: 'hidden',
  fontFamily: '$body',
  bg: '$background1',
  ':focus': { outlineOffset: '$offsetDefault' },
}, {
  name: 'Card',
  variants: {
    theme: {
      primary: { color: '$primaryText3' },
      secondary: { color: '$secondaryText3' },
      neutral: { color: '$neutralText3' },
    },
    size: {
      sm: { p: '$8' },
      md: { p: '$16' },
      lg: { p: '$20' },
    },
    elevation: {
      flat: { border: '$neutralMin', borderWidth: '$widthMin' },
      normal: { boxShadow: '$md' },
      raised: { boxShadow: '$xl' },
      glass: {
        backdropFilter: 'blur(var(--stl-glass-blur, 0))',
        bg: 'var(--stl-glass-tint, transparent)',
        border: 'var(--stl-glass-border, none)',
        boxShadow: 'none',
        lowMotion: {
          backdropFilter: 'none',
          bg: 'var(--stl-glass-tint, $neutral2)',
        },
      },
    },
    flush: {
      true: { p: '$0' },
    },
    interactive: {
      true: {
        cursor: 'pointer',
        ':pressed': { transform: 'scale(0.98)' },
        lowMotion: {
          transition: 'none',
          ':pressed': { transform: 'none' },
        },
      },
    },
  },
  compoundVariants: [
    // ── flat × theme borders ─────────────────────────────
    { when: { elevation: 'flat', theme: 'neutral' }, stl: { border: '$neutral5', borderWidth: '$widthMin' } },
    { when: { elevation: 'flat', theme: 'primary' }, stl: { border: '$primary5', borderWidth: '$widthMin' } },
    { when: { elevation: 'flat', theme: 'secondary' }, stl: { border: '$secondary5', borderWidth: '$widthMin' } },
    // ── neutral × interactive ────────────────────────────
    {
      when: { theme: 'neutral', interactive: 'true' },
      stl: {
        ':interact': { bg: '$neutral3' },
        ':pressed': { bg: '$neutral4' },
        ':focus': { outline: '$neutral' },
      },
    },
    // ── primary × interactive ────────────────────────────
    {
      when: { theme: 'primary', interactive: 'true' },
      stl: {
        ':interact': { bg: '$primary3' },
        ':pressed': { bg: '$primary4' },
        ':focus': { outline: '$primary' },
      },
    },
    // ── secondary × interactive ──────────────────────────
    {
      when: { theme: 'secondary', interactive: 'true' },
      stl: {
        ':interact': { bg: '$secondary3' },
        ':pressed': { bg: '$secondary4' },
        ':focus': { outline: '$secondary' },
      },
    },
  ],
  defaultVariants: { size: 'md', elevation: 'normal', theme: 'neutral' },
  mapProps: (props: any) => ({
    ...props,
    ...(props.interactive && { role: 'button', tabIndex: 0 }),
  }),
})

const CardHeader = styled('header', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  p: '$16',
}, { name: 'CardHeader' })

const CardContent = styled('section', { p: '$16', flex: '1' }, { name: 'CardContent' })

const CardFooter = styled('footer', {
  display: 'flex',
  alignItems: 'center',
  gap: '$8',
  p: '$16',
}, { name: 'CardFooter' })

const CardTitle = styled('h3', { fontWeight: '$600', fontSize: '$h4', m: '$0', color: 'inherit' }, { name: 'CardTitle' })

const CardDescription = styled('p', { fontSize: '$small', m: '$0', color: '$neutralText4' }, { name: 'CardDescription' })

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
})

export type CardProps = ComponentPropsWithRef<typeof CardRoot>
