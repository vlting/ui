import { render } from '../../../../../src/__test-utils__/render'
import { Heading } from './Heading'

describe('Heading', () => {
  it('renders an h2 by default', () => {
    const { container } = render(<Heading>Title</Heading>)
    const h2 = container.querySelector('h2')
    expect(h2).toBeTruthy()
    expect(h2!.textContent).toBe('Title')
  })

  it('renders each sub-component with the correct HTML element', () => {
    const cases = [
      { Sub: Heading.H1, tag: 'h1' },
      { Sub: Heading.H2, tag: 'h2' },
      { Sub: Heading.H3, tag: 'h3' },
      { Sub: Heading.H4, tag: 'h4' },
      { Sub: Heading.H5, tag: 'h5' },
      { Sub: Heading.H6, tag: 'h6' },
    ] as const
    for (const { Sub, tag } of cases) {
      const { container } = render(<Sub>Content</Sub>)
      const element = container.querySelector(tag)
      expect(element).toBeTruthy()
    }
  })

  it('renders children text via sub-component', () => {
    const { getByText } = render(<Heading.H1>Hello World</Heading.H1>)
    expect(getByText('Hello World')).toBeTruthy()
  })

  it('passes through HTML attributes', () => {
    const { container } = render(
      <Heading.H1 id="main-heading">
        Main
      </Heading.H1>,
    )
    const h1 = container.querySelector('h1')
    expect(h1!.id).toBe('main-heading')
  })
})
