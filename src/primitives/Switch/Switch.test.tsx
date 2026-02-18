import { render, screen } from '../../__test-utils__/render'
import { Switch } from './Switch'

describe('Switch', () => {
  it('renders without crashing', () => {
    render(<Switch testID="switch" />)
    expect(screen.getByTestId('switch')).toBeTruthy()
  })
})
