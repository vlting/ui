import type { GetProps } from 'tamagui'
import { Text as TamaguiText, styled } from 'tamagui'

// ---------------------------------------------------------------------------
// Text primitive — foundational typography component
//
// Spec: Text.spec.md
// All text content in the design system must be rendered through this
// component (or a component that extends it) rather than bare platform
// text elements.
//
// Variants map to the design token type scale:
//   display    — largest, hero text
//   heading    — section/page headings
//   subheading — sub-section headings
//   body       — default body copy (default)
//   label      — form labels and UI labels
//   caption    — supporting/supplemental text
//   overline   — category labels, section markers (uppercase)
// ---------------------------------------------------------------------------

const TextFrame = styled(TamaguiText, {
  // Base: use primary foreground color token — supports light/dark
  color: '$color',

  variants: {
    variant: {
      display: {
        fontSize: '$10',
        lineHeight: '$10',
        fontWeight: '$8' as '800',
        fontFamily: '$heading',
        letterSpacing: '$10',
      },
      heading: {
        fontSize: '$8',
        lineHeight: '$8',
        fontWeight: '$7' as '700',
        fontFamily: '$heading',
        letterSpacing: '$8',
      },
      subheading: {
        fontSize: '$6',
        lineHeight: '$6',
        fontWeight: '$6' as '600',
        fontFamily: '$heading',
        letterSpacing: '$6',
      },
      body: {
        fontSize: '$4',
        lineHeight: '$4',
        fontWeight: '$2' as '400',
        fontFamily: '$body',
      },
      label: {
        fontSize: '$3',
        lineHeight: '$3',
        fontWeight: '$3' as '500',
        fontFamily: '$body',
      },
      caption: {
        fontSize: '$2',
        lineHeight: '$2',
        fontWeight: '$2' as '400',
        fontFamily: '$body',
      },
      overline: {
        fontSize: '$1',
        lineHeight: '$1',
        fontWeight: '$3' as '500',
        fontFamily: '$body',
        textTransform: 'uppercase' as const,
        letterSpacing: 1,
      },
    },
  } as const,

  defaultVariants: {
    variant: 'body',
  },
})

export type TextProps = GetProps<typeof TextFrame>

export { TextFrame }

export const Text = TextFrame
