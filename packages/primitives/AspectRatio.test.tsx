import { render } from '@testing-library/react'
import { AspectRatio } from './AspectRatio'

describe('AspectRatio', () => {
  it('renders children', () => {
    const { getByText } = render(
      <AspectRatio>
        <div>Content</div>
      </AspectRatio>,
    )
    expect(getByText('Content')).toBeTruthy()
  })

  it('defaults to a 1:1 aspect ratio', () => {
    const { container } = render(
      <AspectRatio>
        <div>Content</div>
      </AspectRatio>,
    )
    const outer = container.firstChild as HTMLElement
    expect(outer.style.paddingBottom).toBe('100%')
  })

  it('calculates correct paddingBottom for 16:9 ratio', () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <div>Content</div>
      </AspectRatio>,
    )
    const outer = container.firstChild as HTMLElement
    const expected = `${100 / (16 / 9)}%`
    expect(outer.style.paddingBottom).toBe(expected)
  })

  it('calculates correct paddingBottom for 4:3 ratio', () => {
    const { container } = render(
      <AspectRatio ratio={4 / 3}>
        <div>Content</div>
      </AspectRatio>,
    )
    const outer = container.firstChild as HTMLElement
    expect(outer.style.paddingBottom).toBe(`${100 / (4 / 3)}%`)
  })

  it('renders two nested divs', () => {
    const { container } = render(
      <AspectRatio>
        <div>Content</div>
      </AspectRatio>,
    )
    const outer = container.firstChild as HTMLElement
    const inner = outer.firstChild as HTMLElement
    expect(outer.tagName).toBe('DIV')
    expect(inner.tagName).toBe('DIV')
  })

  it('inner div uses absolute positioning', () => {
    const { container } = render(
      <AspectRatio>
        <div>Content</div>
      </AspectRatio>,
    )
    const outer = container.firstChild as HTMLElement
    const inner = outer.firstChild as HTMLElement
    expect(inner.style.position).toBe('absolute')
  })

  it('merges custom style on outer div', () => {
    const { container } = render(
      <AspectRatio style={{ border: '1px solid red' }}>
        <div>Content</div>
      </AspectRatio>,
    )
    const outer = container.firstChild as HTMLElement
    expect(outer.style.border).toBe('1px solid red')
  })
})
