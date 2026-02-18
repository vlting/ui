import { render, screen } from '../../__test-utils__/render'
import { InventoryStatusBadge } from './InventoryStatusBadge'

describe('InventoryStatusBadge', () => {
  it('renders without crashing', () => {
    render(<InventoryStatusBadge testID="inventorystatusbadge" />)
    expect(screen.getByTestId('inventorystatusbadge')).toBeTruthy()
  })
})
