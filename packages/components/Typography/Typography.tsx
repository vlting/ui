import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'

// ---------------------------------------------------------------------------
// Headings — weight alternation: h1(heavy) h2(light) h3(heavy) h4(light) h5(heavy) h6(light)
// Font weight keys map to heading levels in reverse: key 6=h1, key 5=h2, etc.
// ---------------------------------------------------------------------------

const H1Frame = styledHtml('h1', {
  fontFamily: '$heading',
  fontSize: '$9',
  lineHeight: '$9',
  fontWeight: '$6',
  letterSpacing: '$7',
  color: '$color',
  margin: 0,
} as any)

const H2Frame = styledHtml('h2', {
  fontFamily: '$heading',
  fontSize: '$8',
  lineHeight: '$8',
  fontWeight: '$5',
  letterSpacing: '$6',
  color: '$color',
  margin: 0,
} as any)

const H3Frame = styledHtml('h3', {
  fontFamily: '$heading',
  fontSize: '$7',
  lineHeight: '$7',
  fontWeight: '$4',
  letterSpacing: '$5',
  color: '$color',
  margin: 0,
} as any)

const H4Frame = styledHtml('h4', {
  fontFamily: '$heading',
  fontSize: '$6',
  lineHeight: '$6',
  fontWeight: '$3',
  letterSpacing: '$4',
  color: '$color',
  margin: 0,
} as any)

const H5Frame = styledHtml('h5', {
  fontFamily: '$heading',
  fontSize: '$5',
  lineHeight: '$5',
  fontWeight: '$2',
  letterSpacing: '$3',
  color: '$color',
  margin: 0,
} as any)

const H6Frame = styledHtml('h6', {
  fontFamily: '$heading',
  fontSize: '$4',
  lineHeight: '$4',
  fontWeight: '$1',
  letterSpacing: '$2',
  color: '$color',
  margin: 0,
} as any)

// ---------------------------------------------------------------------------
// Body text
// ---------------------------------------------------------------------------

const PFrame = styledHtml('p', {
  fontFamily: '$body',
  fontSize: '$5',
  lineHeight: '$5',
  fontWeight: '$2',
  color: '$color',
  margin: 0,
} as any)

const LeadFrame = styledHtml('p', {
  fontFamily: '$body',
  fontSize: '$7',
  lineHeight: '$7',
  fontWeight: '$2',
  color: '$colorSubtitle',
  margin: 0,
} as any)

const LargeFrame = styledHtml('span', {
  fontFamily: '$body',
  fontSize: '$6',
  lineHeight: '$6',
  fontWeight: '$4',
  color: '$color',
} as any)

const SmallFrame = styledHtml('small', {
  fontFamily: '$body',
  fontSize: '$4',
  lineHeight: '$4',
  fontWeight: '$3',
  color: '$color',
} as any)

const MutedFrame = styledHtml('p', {
  fontFamily: '$body',
  fontSize: '$4',
  lineHeight: '$4',
  fontWeight: '$2',
  color: '$colorSubtitle',
  margin: 0,
} as any)

// ---------------------------------------------------------------------------
// Block elements
// ---------------------------------------------------------------------------

const BlockquoteFrame = styledHtml('blockquote', {
  fontFamily: '$quote',
  fontStyle: 'italic',
  fontSize: '$2',
  lineHeight: '$2',
  fontWeight: '$1',
  color: '$color',
  margin: 0,
  paddingLeft: '$2',
  borderLeftWidth: 2,
  borderLeftStyle: 'solid',
  borderLeftColor: '$borderColor',
} as any)

const InlineCodeFrame = styledHtml('code', {
  fontFamily: '$mono',
  fontSize: '$4',
  lineHeight: '$4',
  fontWeight: '$1',
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
  lineHeight: '$5',
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
export const H5 = H5Frame as AnyFC
export const H6 = H6Frame as AnyFC
export const P = PFrame as AnyFC
export const Lead = LeadFrame as AnyFC
export const Large = LargeFrame as AnyFC
export const Small = SmallFrame as AnyFC
export const Muted = MutedFrame as AnyFC
export const Blockquote = BlockquoteFrame as AnyFC
export const InlineCode = InlineCodeFrame as AnyFC
export const List = UlFrame as AnyFC
export const ListItem = LiFrame as AnyFC
