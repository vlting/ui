import { render, screen } from '../../../../../src/__test-utils__/render'
import { Text } from './Text'

describe('Text', () => {
  it('renders text content', () => {
    render(<Text>Hello World</Text>)
    expect(screen.getByText('Hello World')).toBeTruthy()
  })

  it('accepts size variant', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    for (const size of sizes) {
      const { unmount } = render(<Text size={size}>Text</Text>)
      expect(screen.getByText('Text')).toBeTruthy()
      unmount()
    }
  })

  it('accepts tone variant', () => {
    const tones = ['neutral', 'muted', 'primary', 'success', 'warning', 'danger'] as const
    for (const tone of tones) {
      const { unmount } = render(<Text tone={tone}>Text</Text>)
      expect(screen.getByText('Text')).toBeTruthy()
      unmount()
    }
  })

  it('accepts weight variant', () => {
    const weights = ['light', 'normal', 'medium', 'semibold', 'bold'] as const
    for (const weight of weights) {
      const { unmount } = render(<Text weight={weight}>Text</Text>)
      expect(screen.getByText('Text')).toBeTruthy()
      unmount()
    }
  })

  it('Text.Small renders a <small> element', () => {
    const { container } = render(<Text.Small>Fine print</Text.Small>)
    const el = container.querySelector('small')
    expect(el).toBeTruthy()
    expect(el!.textContent).toBe('Fine print')
  })

  it('Text.Code renders a <code> element', () => {
    const { container } = render(<Text.Code>const x = 1</Text.Code>)
    const el = container.querySelector('code')
    expect(el).toBeTruthy()
    expect(el!.textContent).toBe('const x = 1')
  })
})
