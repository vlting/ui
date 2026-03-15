import { render, screen } from '../../../../../src/__test-utils__/render'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('renders without errors', () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toBeTruthy()
  })

  it('has aria-hidden="true"', () => {
    render(<Skeleton data-testid="skeleton" />)
    const el = screen.getByTestId('skeleton')
    expect(el.getAttribute('aria-hidden')).toBe('true')
  })

  it('accepts circle variant', () => {
    render(<Skeleton circle data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toBeTruthy()
  })

  it('accepts width and height via style', () => {
    render(<Skeleton style={{ width: 100, height: 20 }} data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toBeTruthy()
  })
})
