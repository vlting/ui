import { render, screen } from '../../__test-utils__/render'
import { Drawer } from './Drawer'

describe('Drawer', () => {
  it('renders without crashing', () => {
    render(<Drawer testID="drawer" />)
    expect(screen.getByTestId('drawer')).toBeTruthy()
  })
})
