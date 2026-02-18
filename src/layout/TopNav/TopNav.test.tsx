import { render, screen } from '../../__test-utils__/render'
import { TopNav } from './TopNav'

describe('TopNav', () => {
  it('renders without crashing', () => {
    render(<TopNav testID="topnav" />)
    expect(screen.getByTestId('topnav')).toBeTruthy()
  })
})
