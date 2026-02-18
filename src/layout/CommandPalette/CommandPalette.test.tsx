import { render, screen } from '../../__test-utils__/render'
import { CommandPalette } from './CommandPalette'

describe('CommandPalette', () => {
  it('renders without crashing', () => {
    render(<CommandPalette testID="commandpalette" />)
    expect(screen.getByTestId('commandpalette')).toBeTruthy()
  })
})
