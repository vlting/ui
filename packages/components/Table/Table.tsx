import React from 'react'

/**
 * Table component using native HTML elements for proper table display context.
 * Tamagui's styled(View, { tag: 'table' }) retains display:flex which breaks
 * table layout. Native elements get correct display:table/table-row/etc.
 *
 * Styling uses CSS custom properties that map to Tamagui theme tokens
 * via inline styles, keeping everything token-based.
 */

const tableStyles: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: 'var(--f-body, inherit)',
}

const headerStyles: React.CSSProperties = {}

const bodyStyles: React.CSSProperties = {}

const footerStyles: React.CSSProperties = {}

const rowStyles: React.CSSProperties = {
  borderBottom: '1px solid var(--borderColor, #e8e8e8)',
}

const headStyles: React.CSSProperties = {
  fontFamily: 'var(--f-body, inherit)',
  fontWeight: 600,
  fontSize: 'var(--f-size-3, 14px)',
  color: 'var(--colorSubtitle, #6a6a6a)',
  padding: '8px 12px',
  textAlign: 'left' as const,
  verticalAlign: 'middle',
  backgroundColor: 'var(--color2, #f9f9f9)',
}

const cellStyles: React.CSSProperties = {
  fontFamily: 'var(--f-body, inherit)',
  fontSize: 'var(--f-size-3, 14px)',
  color: 'var(--color, #111)',
  padding: '8px 12px',
  verticalAlign: 'middle',
}

const captionStyles: React.CSSProperties = {
  fontFamily: 'var(--f-body, inherit)',
  fontSize: 'var(--f-size-2, 12px)',
  color: 'var(--colorSubtitle, #6a6a6a)',
  padding: '8px 0',
  textAlign: 'left' as const,
  captionSide: 'bottom' as const,
}

type HtmlProps<T extends keyof React.JSX.IntrinsicElements> = React.JSX.IntrinsicElements[T]

function Root(props: HtmlProps<'table'>) {
  return <table {...props} style={{ ...tableStyles, ...props.style }} />
}

function Header(props: HtmlProps<'thead'>) {
  return <thead {...props} style={{ ...headerStyles, ...props.style }} />
}

function Body(props: HtmlProps<'tbody'>) {
  return <tbody {...props} style={{ ...bodyStyles, ...props.style }} />
}

function Footer(props: HtmlProps<'tfoot'>) {
  return <tfoot {...props} style={{ ...footerStyles, ...props.style }} />
}

function Row(props: HtmlProps<'tr'>) {
  return <tr {...props} style={{ ...rowStyles, ...props.style }} />
}

function Head(props: HtmlProps<'th'>) {
  return <th {...props} style={{ ...headStyles, ...props.style }} />
}

function Cell(props: HtmlProps<'td'>) {
  return <td {...props} style={{ ...cellStyles, ...props.style }} />
}

function Caption(props: HtmlProps<'caption'>) {
  return <caption {...props} style={{ ...captionStyles, ...props.style }} />
}

export const Table = {
  Root,
  Header,
  Body,
  Footer,
  Row,
  Head,
  Cell,
  Caption,
}
