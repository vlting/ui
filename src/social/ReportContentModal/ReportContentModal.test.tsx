import { render, screen } from '../../__test-utils__/render'
import { ReportContentModal } from './ReportContentModal'

describe('ReportContentModal', () => {
  it('renders without crashing', () => {
    render(<ReportContentModal testID="reportcontentmodal" />)
    expect(screen.getByTestId('reportcontentmodal')).toBeTruthy()
  })
})
