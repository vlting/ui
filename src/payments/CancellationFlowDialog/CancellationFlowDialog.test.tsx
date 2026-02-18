import { render, screen } from '../../__test-utils__/render'
import { CancellationFlowDialog } from './CancellationFlowDialog'

describe('CancellationFlowDialog', () => {
  it('renders without crashing', () => {
    render(<CancellationFlowDialog testID="cancellationflowdialog" />)
    expect(screen.getByTestId('cancellationflowdialog')).toBeTruthy()
  })
})
