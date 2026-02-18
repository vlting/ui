import { render, screen } from '../../__test-utils__/render'
import { Stack } from './Stack'

describe('Stack', () => {
  it('renders without crashing', () => {
    render(<Stack testID="stack" />)
    expect(screen.getByTestId('stack')).toBeTruthy()
  })
})
