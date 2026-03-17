import type { ComponentPropsWithRef } from 'react'
import { styled } from '../../stl-react/src/config'

// ─── Card ───────────────────────────────────────────────────────────────────

const CardRoot = styled('article', {
  stl: {
    border: '$borderColor',
    borderWidth: '$widthMin',
    borderRadius: '$4',
    overflow: 'hidden',
    fontFamily: '$body',
    bg: '$color1',
  },
  variants: {
    size: {
      sm: { p: '$8' },
      md: { p: '$16' },
      lg: { p: '$20' },
    },
    elevated: {
      true: { borderWidth: '0', boxShadow: '$md' },
    },
    interactive: {
      true: {
        cursor: 'pointer',
        ':interact': { bg: '$color3' },
        ':pressed': { bg: '$color4', transform: 'scale(0.98)' },
        ':focus': {
          outlineWidth: '2px',
          outlineStyle: 'solid',
          outlineColor: '$outlineColor',
          outlineOffset: '2px',
        },
        lowMotion: {
          transition: 'none',
          ':pressed': { transform: 'none' },
        },
      },
    },
  },
  defaultVariants: { size: 'md' },
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
