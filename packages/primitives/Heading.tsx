import React from 'react'
import { styled } from '../stl-react/src/config'

const baseStyles = {
  fontFamily: '$heading',
  color: '$defaultHeading',
  margin: '0',
}

const H1Frame = styled(
  'h1',
  { stl: { ...baseStyles, fontSize: '$h1', lineHeight: '$heading', fontWeight: '$700' }, styleName: 'H1' },
)
const H2Frame = styled(
  'h2',
  { stl: { ...baseStyles, fontSize: '$h2', lineHeight: '$heading', fontWeight: '$700' }, styleName: 'H2' },
)
const H3Frame = styled(
  'h3',
  { stl: { ...baseStyles, fontSize: '$h3', lineHeight: '$heading', fontWeight: '$600' }, styleName: 'H3' },
)
const H4Frame = styled(
  'h4',
  { stl: { ...baseStyles, fontSize: '$h4', lineHeight: '$heading', fontWeight: '$600' }, styleName: 'H4' },
)
const H5Frame = styled(
  'h5',
  { stl: { ...baseStyles, fontSize: '$h5', lineHeight: '$heading', fontWeight: '$600' }, styleName: 'H5' },
)
const H6Frame = styled(
  'h6',
  { stl: { ...baseStyles, fontSize: '$h6', lineHeight: '$heading', fontWeight: '$600' }, styleName: 'H6' },
)

type HeadingFrame = typeof H1Frame
const LEVEL_MAP = {
  1: H1Frame,
  2: H2Frame,
  3: H3Frame,
  4: H4Frame,
  5: H5Frame,
  6: H6Frame,
} as Record<number, HeadingFrame>

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading({ level = 2, ...rest }, ref) {
    const Component = LEVEL_MAP[level] ?? LEVEL_MAP[2]
    return <Component {...({ ref, ...rest } as any)} />
  },
)
