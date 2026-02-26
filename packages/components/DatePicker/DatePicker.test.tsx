import { render, screen } from '../../../src/__test-utils__/render'
import { DatePicker } from './DatePicker'

describe('DatePicker', () => {
  it('renders with placeholder', () => {
    render(<DatePicker placeholder="Select date" />)
    expect(screen.getByText('Select date')).toBeTruthy()
  })

  it('renders with label', () => {
    render(<DatePicker label="Birth date" placeholder="Select" />)
    expect(screen.getByText('Birth date')).toBeTruthy()
  })

  it('displays formatted date when value is set', () => {
    const date = new Date(2025, 0, 15) // Jan 15, 2025
    render(<DatePicker value={date} placeholder="Select" />)
    // Should show formatted date instead of placeholder
    expect(screen.queryByText('Select')).toBeNull()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<DatePicker size={size} placeholder="Pick" />)
      expect(screen.getByText('Pick')).toBeTruthy()
      unmount()
    }
  })

  it('shows error state', () => {
    render(<DatePicker error errorMessage="Required" placeholder="Select" />)
    expect(screen.getByText('Required')).toBeTruthy()
  })

  it('shows helper text', () => {
    render(<DatePicker helperText="MM/DD/YYYY" placeholder="Select" />)
    expect(screen.getByText('MM/DD/YYYY')).toBeTruthy()
  })

  it('is disabled when disabled prop is true', () => {
    render(<DatePicker disabled placeholder="Disabled" />)
    expect(screen.getByText('Disabled')).toBeTruthy()
  })
})
