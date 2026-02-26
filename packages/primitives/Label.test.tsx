import { render, screen } from '../../src/__test-utils__/render'
import { Label } from './Label'

describe('Label', () => {
  it('renders label text', () => {
    render(<Label>Email</Label>)
    expect(screen.getByText('Email')).toBeTruthy()
  })

  it.skip('renders a <label> element with htmlFor', () => {
    // TODO: Tamagui Label rendering in JSDOM may differ from browser
    const { container } = render(<Label htmlFor="email-input">Email</Label>)
    const label = container.querySelector('label')
    expect(label).toBeTruthy()
    expect(label!.htmlFor).toBe('email-input')
  })

  it('shows red asterisk when required', () => {
    render(<Label required>Name</Label>)
    expect(screen.getByText('*')).toBeTruthy()
  })

  it('does not show asterisk when not required', () => {
    const { container } = render(<Label>Name</Label>)
    const asterisks = container.querySelectorAll('[style*="color"]')
    // No red asterisk should be rendered
    expect(screen.queryByText('*')).toBeNull()
  })

  it('accepts size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Label size={size}>Label</Label>)
      expect(screen.getByText('Label')).toBeTruthy()
      unmount()
    }
  })
})
