import { render, screen } from '../../__test-utils__/render'
import { ExportReportButton } from './ExportReportButton'

describe('ExportReportButton', () => {
  it('renders without crashing', () => {
    render(<ExportReportButton testID="exportreportbutton" />)
    expect(screen.getByTestId('exportreportbutton')).toBeTruthy()
  })
})
