import { render, screen } from '../../__test-utils__/render'
import { ThreadComposer } from './ThreadComposer'

describe('ThreadComposer', () => {
  it('renders without crashing', () => {
    render(<ThreadComposer testID="threadcomposer" />)
    expect(screen.getByTestId('threadcomposer')).toBeTruthy()
  })
})
