import { render, screen } from '../../__test-utils__/render'
import { ThreadList } from './ThreadList'

describe('ThreadList', () => {
  it('renders without crashing', () => {
    render(<ThreadList testID="threadlist" />)
    expect(screen.getByTestId('threadlist')).toBeTruthy()
  })
})
