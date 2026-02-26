import { render } from '../../src/__test-utils__/render'
import { VisuallyHidden } from './VisuallyHidden'

describe('VisuallyHidden', () => {
  it('renders children', () => {
    const { getByText } = render(<VisuallyHidden>Screen reader only</VisuallyHidden>)
    expect(getByText('Screen reader only')).toBeTruthy()
  })

  it.skip('applies sr-only clip styles', () => {
    // TODO: requires browser environment — Tamagui inline styles not applied in JSDOM
    const { container } = render(<VisuallyHidden>Hidden text</VisuallyHidden>)
    const el = container.firstChild as HTMLElement
    expect(el.style.clip).toMatch(/rect/)
    expect(el.style.overflow).toBe('hidden')
    expect(el.style.whiteSpace).toBe('nowrap')
  })

  it.skip('applies position absolute', () => {
    // TODO: requires browser environment — Tamagui inline styles not applied in JSDOM
    const { container } = render(<VisuallyHidden>Hidden text</VisuallyHidden>)
    const el = container.firstChild as HTMLElement
    expect(el.style.position).toBe('absolute')
  })

  it('content is still in the DOM', () => {
    const { getByText } = render(
      <VisuallyHidden>
        <span>Accessible content</span>
      </VisuallyHidden>,
    )
    expect(getByText('Accessible content')).toBeInTheDocument()
  })
})
