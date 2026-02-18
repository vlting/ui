import { render, screen } from '../../__test-utils__/render'
import { InventoryTable } from './InventoryTable'

describe('InventoryTable', () => {
  it('renders without crashing', () => {
    render(<InventoryTable testID="inventorytable" />)
    expect(screen.getByTestId('inventorytable')).toBeTruthy()
  })
})
