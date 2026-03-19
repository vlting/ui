import { styled } from '../../config'

const baseStl = {
  fontFamily: '$heading',
  color: '$defaultHeading',
  margin: '0',
} as const

const H1 = styled('h1', { ...baseStl, fontSize: '$h1', lineHeight: '$heading', fontWeight: '$700' }, { name: 'Heading.H1' })
const H2 = styled('h2', { ...baseStl, fontSize: '$h2', lineHeight: '$heading', fontWeight: '$700' }, { name: 'Heading.H2' })
const H3 = styled('h3', { ...baseStl, fontFamily: '$subheading', fontSize: '$h3', lineHeight: '$heading', fontWeight: '$600' }, { name: 'Heading.H3' })
const H4 = styled('h4', { ...baseStl, fontFamily: '$subheading', fontSize: '$h4', lineHeight: '$heading', fontWeight: '$600' }, { name: 'Heading.H4' })
const H5 = styled('h5', { ...baseStl, fontFamily: '$subheading', fontSize: '$h5', lineHeight: '$heading', fontWeight: '$600' }, { name: 'Heading.H5' })
const H6 = styled('h6', { ...baseStl, fontFamily: '$subheading', fontSize: '$h6', lineHeight: '$heading', fontWeight: '$600' }, { name: 'Heading.H6' })

export const Heading = Object.assign(H2, { H1, H2, H3, H4, H5, H6 })
