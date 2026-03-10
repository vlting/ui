import { render, screen } from '../../src/__test-utils__/render'
import { Divider } from './Divider'

describe('Divider', () => {
  it('renders without errors', () => {
    render(<Divider data-testid="divider" />)
    expect(screen.getByTestId('divider')).toBeTruthy()
  })

  it.skip('defaults to horizontal orientation', () => {
    // TODO: requires browser environment for computed styles
    render(<Divider data-testid="divider" />)
    expect(screen.getByTestId('divider')).toBeTruthy()
  })

  it('accepts vertical orientation', () => {
    render(<Divider orientation="vertical" data-testid="divider" />)
    expect(screen.getByTestId('divider')).toBeTruthy()
  })
})
