import React from 'react'
import { render } from '../../src/__test-utils__/render'
import { Heading } from './Heading'

describe('Heading', () => {
  it('renders an h2 by default', () => {
    const { container } = render(<Heading>Title</Heading>)
    const h2 = container.querySelector('h2')
    expect(h2).toBeTruthy()
    expect(h2!.textContent).toBe('Title')
  })

  it('renders the correct heading level for each value', () => {
    const levels = [1, 2, 3, 4, 5, 6] as const
    for (const level of levels) {
      const { container } = render(<Heading level={level}>Heading</Heading>)
      const element = container.querySelector(`h${level}`)
      expect(element).toBeTruthy()
    }
  })

  it('renders children text', () => {
    const { getByText } = render(<Heading level={1}>Hello World</Heading>)
    expect(getByText('Hello World')).toBeTruthy()
  })

  it('forwards ref to the heading element', () => {
    const ref = React.createRef<HTMLHeadingElement>()
    render(
      <Heading ref={ref} level={3}>
        With Ref
      </Heading>,
    )
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement)
    expect(ref.current!.tagName).toBe('H3')
  })

  it('passes through HTML attributes', () => {
    const { container } = render(
      <Heading level={1} id="main-heading">
        Main
      </Heading>,
    )
    const h1 = container.querySelector('h1')
    expect(h1!.id).toBe('main-heading')
  })
})
