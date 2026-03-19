import { render } from '../../../src/__test-utils__/render'
import { Separator } from './Separator'

describe('Separator', () => {
  it('renders an hr element by default', () => {
    const { container } = render(<Separator />)
    expect(container.querySelector('hr')).toBeTruthy()
  })

  it('has role="separator" when not decorative', () => {
    const { container } = render(<Separator />)
    const hr = container.querySelector('hr')
    expect(hr!.getAttribute('role')).toBe('separator')
  })

  it('has role="none" when decorative', () => {
    const { container } = render(<Separator decorative />)
    const hr = container.querySelector('hr')
    expect(hr!.getAttribute('role')).toBe('none')
  })

  it('accepts orientation prop', () => {
    const { container } = render(<Separator orientation="vertical" />)
    const hr = container.querySelector('hr')
    expect(hr!.getAttribute('aria-orientation')).toBe('vertical')
  })
})
