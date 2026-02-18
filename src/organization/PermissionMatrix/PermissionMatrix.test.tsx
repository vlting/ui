import { render, screen } from '../../__test-utils__/render'
import { PermissionMatrix } from './PermissionMatrix'

describe('PermissionMatrix', () => {
  it('renders without crashing', () => {
    render(<PermissionMatrix testID="permissionmatrix" />)
    expect(screen.getByTestId('permissionmatrix')).toBeTruthy()
  })
})
