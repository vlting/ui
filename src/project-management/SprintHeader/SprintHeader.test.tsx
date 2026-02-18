import { render, screen } from '../../__test-utils__/render'
import { SprintHeader } from './SprintHeader'

describe('SprintHeader', () => {
  it('renders without crashing', () => {
    render(<SprintHeader testID="sprintheader" />)
    expect(screen.getByTestId('sprintheader')).toBeTruthy()
  })
})
