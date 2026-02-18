import { render, screen } from '../../__test-utils__/render'
import { WarehouseSelector } from './WarehouseSelector'

describe('WarehouseSelector', () => {
  it('renders without crashing', () => {
    render(<WarehouseSelector testID="warehouseselector" />)
    expect(screen.getByTestId('warehouseselector')).toBeTruthy()
  })
})
