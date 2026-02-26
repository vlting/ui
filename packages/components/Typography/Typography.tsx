import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'

// ---------------------------------------------------------------------------
// Headings
// ---------------------------------------------------------------------------

const H1Frame = styledHtml('h1', {
  fontFamily: '$heading',
  fontWeight: '700',
  fontSize: 36,
  lineHeight: 44,
  letterSpacing: '-0.025em',
  color: '$color',
  margin: 0,
} as any)

const H2Frame = styledHtml('h2', {
  fontFamily: '$heading',
  fontWeight: '600',
  fontSize: 30,
  lineHeight: 38,
  letterSpacing: '-0.025em',
  color: '$color',
  margin: 0,
} as any)

const H3Frame = styledHtml('h3', {
  fontFamily: '$heading',
  fontWeight: '600',
  fontSize: '$8',
  lineHeight: 32,
  letterSpacing: '-0.025em',
  color: '$color',
  margin: 0,
} as any)

const H4Frame = styledHtml('h4', {
  fontFamily: '$heading',
  fontWeight: '600',
  fontSize: '$7',
  lineHeight: 28,
  letterSpacing: '-0.025em',
  color: '$color',
  margin: 0,
} as any)

// ---------------------------------------------------------------------------
// Body text
// ---------------------------------------------------------------------------

const PFrame = styledHtml('p', {
  fontFamily: '$body',
  fontWeight: '400',
  fontSize: '$5',
  lineHeight: 28,
  color: '$color',
  margin: 0,
} as any)

const LeadFrame = styledHtml('p', {
  fontFamily: '$body',
  fontWeight: '400',
  fontSize: '$7',
  lineHeight: 32,
  color: '$colorSubtitle',
  margin: 0,
} as any)

const LargeFrame = styledHtml('span', {
  fontFamily: '$body',
  fontWeight: '600',
  fontSize: '$6',
  lineHeight: 28,
  color: '$color',
} as any)

const SmallFrame = styledHtml('small', {
  fontFamily: '$body',
  fontWeight: '500',
  fontSize: '$4',
  lineHeight: 20,
  color: '$color',
} as any)

const MutedFrame = styledHtml('p', {
  fontFamily: '$body',
  fontWeight: '400',
  fontSize: '$4',
  lineHeight: 20,
  color: '$colorSubtitle',
  margin: 0,
} as any)

// ---------------------------------------------------------------------------
// Block elements
// ---------------------------------------------------------------------------

const BlockquoteFrame = styledHtml('blockquote', {
  fontFamily: '$body',
  fontStyle: 'italic',
  fontSize: '$5',
  lineHeight: 28,
  color: '$color',
  margin: 0,
  paddingLeft: '$2',
  borderLeftWidth: 2,
  borderLeftStyle: 'solid',
  borderLeftColor: '$borderColor',
} as any)

const InlineCodeFrame = styledHtml('code', {
  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  fontSize: '$4',
  lineHeight: '20px',
  backgroundColor: '$color2',
  borderRadius: '$2',
  paddingLeft: '$0.5',
  paddingRight: '$0.5',
  paddingTop: '$0.25',
  paddingBottom: '$0.25',
  color: '$color',
} as any)

// ---------------------------------------------------------------------------
// Lists
// ---------------------------------------------------------------------------

const UlFrame = styledHtml('ul', {
  fontFamily: '$body',
  fontSize: '$5',
  lineHeight: 28,
  color: '$color',
  margin: 0,
  paddingLeft: '$3.5',
} as any)

const LiFrame = styledHtml('li', {
  fontFamily: '$body',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  color: 'inherit',
} as any)

// ---------------------------------------------------------------------------
// Cast for JSX usage — v2 RC GetFinalProps bug
// ---------------------------------------------------------------------------

type AnyFC = ComponentType<Record<string, unknown>>

export const H1 = H1Frame as AnyFC
export const H2 = H2Frame as AnyFC
export const H3 = H3Frame as AnyFC
export const H4 = H4Frame as AnyFC
export const P = PFrame as AnyFC
export const Lead = LeadFrame as AnyFC
export const Large = LargeFrame as AnyFC
export const Small = SmallFrame as AnyFC
export const Muted = MutedFrame as AnyFC
export const Blockquote = BlockquoteFrame as AnyFC
export const InlineCode = InlineCodeFrame as AnyFC
export const List = UlFrame as AnyFC
export const ListItem = LiFrame as AnyFC
