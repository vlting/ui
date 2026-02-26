import { render, screen } from '../../../src/__test-utils__/render'
import {
  Blockquote,
  H1,
  H2,
  H3,
  H4,
  InlineCode,
  Large,
  Lead,
  List,
  ListItem,
  Muted,
  P,
  Small,
} from './Typography'

describe('Typography', () => {
  it('renders H1 as h1 element', () => {
    const { container } = render(<H1>Heading 1</H1>)
    expect(container.querySelector('h1')).toBeTruthy()
    expect(screen.getByText('Heading 1')).toBeTruthy()
  })

  it('renders H2 as h2 element', () => {
    const { container } = render(<H2>Heading 2</H2>)
    expect(container.querySelector('h2')).toBeTruthy()
  })

  it('renders H3 as h3 element', () => {
    const { container } = render(<H3>Heading 3</H3>)
    expect(container.querySelector('h3')).toBeTruthy()
  })

  it('renders H4 as h4 element', () => {
    const { container } = render(<H4>Heading 4</H4>)
    expect(container.querySelector('h4')).toBeTruthy()
  })

  it('renders P as p element', () => {
    const { container } = render(<P>Paragraph text</P>)
    expect(container.querySelector('p')).toBeTruthy()
    expect(screen.getByText('Paragraph text')).toBeTruthy()
  })

  it('renders Lead as p element', () => {
    const { container } = render(<Lead>Lead text</Lead>)
    expect(container.querySelector('p')).toBeTruthy()
  })

  it('renders Large as span element', () => {
    const { container } = render(<Large>Large text</Large>)
    expect(container.querySelector('span')).toBeTruthy()
  })

  it('renders Small as small element', () => {
    const { container } = render(<Small>Small text</Small>)
    expect(container.querySelector('small')).toBeTruthy()
  })

  it('renders Muted as span element', () => {
    const { container } = render(<Muted>Muted text</Muted>)
    expect(container.querySelector('span')).toBeTruthy()
  })

  it('renders Blockquote as blockquote element', () => {
    const { container } = render(<Blockquote>A quote</Blockquote>)
    expect(container.querySelector('blockquote')).toBeTruthy()
  })

  it('renders InlineCode as code element', () => {
    const { container } = render(<InlineCode>const x = 1</InlineCode>)
    expect(container.querySelector('code')).toBeTruthy()
  })

  it('renders List as ul element', () => {
    const { container } = render(
      <List>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
      </List>,
    )
    expect(container.querySelector('ul')).toBeTruthy()
    expect(container.querySelectorAll('li').length).toBe(2)
  })

  it('renders all text content', () => {
    render(
      <>
        <H1>Title</H1>
        <P>Body</P>
        <Small>Fine print</Small>
      </>,
    )
    expect(screen.getByText('Title')).toBeTruthy()
    expect(screen.getByText('Body')).toBeTruthy()
    expect(screen.getByText('Fine print')).toBeTruthy()
  })
})
