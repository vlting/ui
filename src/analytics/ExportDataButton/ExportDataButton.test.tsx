import { render, screen } from '../../__test-utils__/render'
import { ExportDataButton } from './ExportDataButton'

describe('ExportDataButton', () => {
  it('renders without crashing', () => {
    render(<ExportDataButton testID="exportdatabutton" />)
    expect(screen.getByTestId('exportdatabutton')).toBeTruthy()
  })
})
