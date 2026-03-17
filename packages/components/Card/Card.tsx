import type { ComponentPropsWithRef } from 'react'
import { styled, options } from '../../stl-react/src/config'

// ─── Card ───────────────────────────────────────────────────────────────────

const CardRoot = styled('article', {
  stl: {
    borderRadius: '$4',
    overflow: 'hidden',
    fontFamily: '$body',
    bg: '$background1',
    ':focus': { outlineOffset: '$offsetDefault' },
  },
  variants: {
    theme: options('primary', 'secondary', 'neutral'),
    size: {
      sm: { p: '$8' },
      md: { p: '$16' },
      lg: { p: '$20' },
    },
    elevation: {
      flat: { border: '$borderColor', borderWidth: '$widthMin' },
      normal: { boxShadow: '$md' },
      raised: { boxShadow: '$xl' },
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
  mapProps: (props) => ({
    ...props,
    ...(props.interactive && { role: 'button', tabIndex: 0 }),
  }),
  styleName: 'Card',
})

const CardHeader = styled('header', {
  stl: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',
    p: '$16',
    borderBottom: '$borderColor',
    borderBottomWidth: '$widthMin',
  },
  styleName: 'CardHeader',
})

const CardContent = styled('section', {
  stl: { p: '$16', flex: '1' },
  styleName: 'CardContent',
})

const CardFooter = styled('footer', {
  stl: {
    display: 'flex',
    alignItems: 'center',
    gap: '$8',
    p: '$16',
    borderTop: '$borderColor',
    borderTopWidth: '$widthMin',
  },
  styleName: 'CardFooter',
})

const CardTitle = styled('h3', {
  stl: { fontWeight: '$600', fontSize: '$h4', m: '$0', color: '$neutralText3' },
  styleName: 'CardTitle',
})

const CardDescription = styled('p', {
  stl: { fontSize: '$small', m: '$0', color: '$neutralText4' },
  styleName: 'CardDescription',
})

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
})

export type CardProps = ComponentPropsWithRef<typeof CardRoot>
