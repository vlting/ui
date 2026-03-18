import React from 'react'
import { styled } from '../../config'

const baseStl = {
  fontFamily: '$heading',
  color: '$defaultHeading',
  margin: '0',
} as const

const H1 = styled('h1', { ...baseStl, fontSize: '$h1', lineHeight: '$heading', fontWeight: '$700' }, { name: 'H1' })
const H2 = styled('h2', { ...baseStl, fontSize: '$h2', lineHeight: '$heading', fontWeight: '$700' }, { name: 'H2' })
const H3 = styled('h3', { ...baseStl, fontSize: '$h3', lineHeight: '$heading', fontWeight: '$600' }, { name: 'H3' })
const H4 = styled('h4', { ...baseStl, fontSize: '$h4', lineHeight: '$heading', fontWeight: '$600' }, { name: 'H4' })
const H5 = styled('h5', { ...baseStl, fontSize: '$h5', lineHeight: '$heading', fontWeight: '$600' }, { name: 'H5' })
const H6 = styled('h6', { ...baseStl, fontSize: '$h6', lineHeight: '$heading', fontWeight: '$600' }, { name: 'H6' })

type HeadingFrame = typeof H1
const LEVEL_MAP: Record<number, HeadingFrame> = { 1: H1, 2: H2, 3: H3, 4: H4, 5: H5, 6: H6 }

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  flat?: boolean
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading({ level = 2, flat, ...rest }, ref) {
    const Component = LEVEL_MAP[level] ?? LEVEL_MAP[2]
    return <Component flat={flat} {...({ ref, ...rest } as any)} />
  },
)
