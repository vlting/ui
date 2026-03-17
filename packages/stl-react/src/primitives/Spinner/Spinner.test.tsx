import { render } from '../../../../../src/__test-utils__/render'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders with role="status"', () => {
    const { getByRole } = render(<Spinner />)
    expect(getByRole('status')).toBeTruthy()
  })

  it('has aria-label="Loading"', () => {
    const { getByRole } = render(<Spinner />)
    expect(getByRole('status').getAttribute('aria-label')).toBe('Loading')
  })

  it('accepts size="sm"', () => {
    const { getByRole } = render(<Spinner size="sm" />)
    expect(getByRole('status')).toBeTruthy()
  })

  it('accepts size="md"', () => {
    const { getByRole } = render(<Spinner size="md" />)
    expect(getByRole('status')).toBeTruthy()
  })

  it('accepts size="lg"', () => {
    const { getByRole } = render(<Spinner size="lg" />)
    expect(getByRole('status')).toBeTruthy()
  })

  it('accepts size="xl"', () => {
    const { getByRole } = render(<Spinner size="xl" />)
    expect(getByRole('status')).toBeTruthy()
  })

  it('accepts theme="min" alias', () => {
    const { getByRole } = render(<Spinner theme="min" />)
    expect(getByRole('status')).toBeTruthy()
  })

  it('accepts theme="max" alias', () => {
    const { getByRole } = render(<Spinner theme="max" />)
    expect(getByRole('status')).toBeTruthy()
  })

  it('accepts custom color', () => {
    const { getByRole } = render(<Spinner color="red" />)
    expect(getByRole('status')).toBeTruthy()
  })

  it('renders SVG content', () => {
    const { container } = render(<Spinner />)
    expect(container.querySelector('svg')).toBeTruthy()
  })
})
