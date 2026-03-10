import { styled } from '../../stl-react/src/config'

// ---------------------------------------------------------------------------
// Headings — weight alternation: h1(heavy) h2(light) h3(heavy) h4(light) h5(heavy) h6(light)
// ---------------------------------------------------------------------------

export const H1 = styled(
  'h1',
  {
    fontFamily: '$heading',
    fontSize: '$h1',
    lineHeight: '$heading',
    fontWeight: '$800',
    letterSpacing: '-0.025em',
    color: '$defaultHeading',
    margin: '0',
  },
  'H1',
)

export const H2 = styled(
  'h2',
  {
    fontFamily: '$heading',
    fontSize: '$h2',
    lineHeight: '$heading',
    fontWeight: '$700',
    letterSpacing: '-0.025em',
    color: '$defaultHeading',
    margin: '0',
  },
  'H2',
)

export const H3 = styled(
  'h3',
  {
    fontFamily: '$heading',
    fontSize: '$h3',
    lineHeight: '$heading',
    fontWeight: '$600',
    color: '$defaultHeading',
    margin: '0',
  },
  'H3',
)

export const H4 = styled(
  'h4',
  {
    fontFamily: '$heading',
    fontSize: '$h4',
    lineHeight: '$heading',
    fontWeight: '$500',
    color: '$defaultHeading',
    margin: '0',
  },
  'H4',
)

export const H5 = styled(
  'h5',
  {
    fontFamily: '$heading',
    fontSize: '$h5',
    lineHeight: '$heading',
    fontWeight: '$400',
    color: '$defaultHeading',
    margin: '0',
  },
  'H5',
)

export const H6 = styled(
  'h6',
  {
    fontFamily: '$heading',
    fontSize: '$h6',
    lineHeight: '$heading',
    fontWeight: '$400',
    color: '$defaultHeading',
    margin: '0',
  },
  'H6',
)

// ---------------------------------------------------------------------------
// Body text
// ---------------------------------------------------------------------------

export const P = styled(
  'p',
  {
    fontFamily: '$body',
    fontSize: '$p',
    lineHeight: '$body',
    fontWeight: '$400',
    color: '$defaultBody',
    margin: '0',
  },
  'P',
)

export const Lead = styled(
  'p',
  {
    fontFamily: '$body',
    fontSize: '$h3',
    lineHeight: '$body',
    fontWeight: '$400',
    color: '$tertiary7',
    margin: '0',
  },
  'Lead',
)

export const Large = styled(
  'span',
  {
    fontFamily: '$body',
    fontSize: '$h4',
    lineHeight: '$body',
    fontWeight: '$600',
    color: '$defaultBody',
  },
  'Large',
)

export const Small = styled(
  'small',
  {
    fontFamily: '$body',
    fontSize: '$14',
    lineHeight: '$body',
    fontWeight: '$500',
    color: '$defaultBody',
  },
  'Small',
)

export const Muted = styled(
  'p',
  {
    fontFamily: '$body',
    fontSize: '$14',
    lineHeight: '$body',
    fontWeight: '$400',
    color: '$tertiary7',
    margin: '0',
  },
  'Muted',
)

// ---------------------------------------------------------------------------
// Block elements
// ---------------------------------------------------------------------------

export const Blockquote = styled(
  'blockquote',
  {
    fontFamily: '$quote',
    fontStyle: 'italic',
    fontSize: '$p',
    lineHeight: '$body',
    fontWeight: '$400',
    color: '$defaultBody',
    margin: '0',
    paddingLeft: '$3',
    borderLeftWidth: '2px',
    borderLeftStyle: 'solid',
    borderLeftColor: '$borderColor',
  },
  'Blockquote',
)

export const InlineCode = styled(
  'code',
  {
    fontFamily: '$code',
    fontSize: '$14',
    lineHeight: '$body',
    fontWeight: '$400',
    backgroundColor: '$surface2',
    borderRadius: '$2',
    paddingLeft: '$1',
    paddingRight: '$1',
    paddingTop: '$0.5',
    paddingBottom: '$0.5',
    color: '$defaultBody',
  },
  'InlineCode',
)

// ---------------------------------------------------------------------------
// Lists
// ---------------------------------------------------------------------------

export const List = styled(
  'ul',
  {
    fontFamily: '$body',
    fontSize: '$p',
    lineHeight: '$body',
    color: '$defaultBody',
    margin: '0',
    paddingLeft: '$5',
  },
  'List',
)

export const ListItem = styled(
  'li',
  {
    fontFamily: '$body',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    color: 'inherit',
  },
  'ListItem',
)
