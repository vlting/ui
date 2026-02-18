import { render, screen } from '../../__test-utils__/render'
import { VirtualizedList } from './VirtualizedList'

describe('VirtualizedList', () => {
  it('renders without crashing', () => {
    render(<VirtualizedList testID="virtualizedlist" />)
    expect(screen.getByTestId('virtualizedlist')).toBeTruthy()
  })
})
