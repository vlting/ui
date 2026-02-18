import { render, screen } from '../../__test-utils__/render'
import { SavedReportList } from './SavedReportList'

describe('SavedReportList', () => {
  it('renders without crashing', () => {
    render(<SavedReportList testID="savedreportlist" />)
    expect(screen.getByTestId('savedreportlist')).toBeTruthy()
  })
})
