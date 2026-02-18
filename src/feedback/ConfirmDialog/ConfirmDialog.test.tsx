import { render, screen } from '../../__test-utils__/render'
import { ConfirmDialog } from './ConfirmDialog'

describe('ConfirmDialog', () => {
  it('renders without crashing', () => {
    render(<ConfirmDialog testID="confirmdialog" />)
    expect(screen.getByTestId('confirmdialog')).toBeTruthy()
  })
})
