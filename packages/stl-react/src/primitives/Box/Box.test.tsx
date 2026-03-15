import { render, screen } from '../../../../../src/__test-utils__/render'
import { Box } from './Box'

describe('Box', () => {
  it('renders without errors', () => {
    render(<Box data-testid="box" />)
    expect(screen.getByTestId('box')).toBeTruthy()
  })

  it('renders children', () => {
    render(<Box>Hello</Box>)
    expect(screen.getByText('Hello')).toBeTruthy()
  })

  it.skip('applies centered variant styles', () => {
    // TODO: requires browser environment for computed styles
    render(<Box centered data-testid="box" />)
    expect(screen.getByTestId('box')).toBeTruthy()
  })

  it('accepts style props', () => {
    render(<Box padding="$4" data-testid="box" />)
    expect(screen.getByTestId('box')).toBeTruthy()
  })
})
