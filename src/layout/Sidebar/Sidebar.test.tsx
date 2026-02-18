import { render, screen } from '../../__test-utils__/render'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  it('renders without crashing', () => {
    render(<Sidebar testID="sidebar" />)
    expect(screen.getByTestId('sidebar')).toBeTruthy()
  })
})
