import type { ComponentType } from 'react'
import React from 'react'
import { styledHtml } from '@tamagui/web'

// ---------------------------------------------------------------------------
// Per-level styled HTML heading elements (semantic <h1>–<h6>)
// ---------------------------------------------------------------------------

const baseStyles = {
  fontFamily: '$heading',
  color: '$color',
  margin: 0,
} as any

const H1Frame = styledHtml('h1', {
  ...baseStyles,
  fontSize: '$10',
  lineHeight: '$10',
  fontWeight: '$5',
} as any)

const H2Frame = styledHtml('h2', {
  ...baseStyles,
  fontSize: '$8',
  lineHeight: '$8',
  fontWeight: '$5',
} as any)

const H3Frame = styledHtml('h3', {
  ...baseStyles,
  fontSize: '$6',
  lineHeight: '$6',
  fontWeight: '$4',
} as any)

const H4Frame = styledHtml('h4', {
  ...baseStyles,
  fontSize: '$5',
  lineHeight: '$5',
  fontWeight: '$4',
} as any)

const H5Frame = styledHtml('h5', {
  ...baseStyles,
  fontSize: '$4',
  lineHeight: '$4',
  fontWeight: '$4',
} as any)

const H6Frame = styledHtml('h6', {
  ...baseStyles,
  fontSize: '$3',
  lineHeight: '$3',
  fontWeight: '$4',
} as any)

// ---------------------------------------------------------------------------
// Cast for JSX usage — v2 RC GetFinalProps bug
// ---------------------------------------------------------------------------

type AnyFC = ComponentType<Record<string, unknown>>

const LEVEL_MAP: Record<number, AnyFC> = {
  1: H1Frame as AnyFC,
  2: H2Frame as AnyFC,
  3: H3Frame as AnyFC,
  4: H4Frame as AnyFC,
  5: H5Frame as AnyFC,
  6: H6Frame as AnyFC,
}

// ---------------------------------------------------------------------------
// Public API — preserves the existing `level` prop interface
// ---------------------------------------------------------------------------

export interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  children?: React.ReactNode
  [key: string]: unknown
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading({ level = 2, ...rest }, ref) {
    const Component = LEVEL_MAP[level] ?? LEVEL_MAP[2]
    return <Component ref={ref} {...rest} />
  },
)
