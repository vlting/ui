import { render, screen } from '../../__test-utils__/render'
import { TimeEntryForm } from './TimeEntryForm'

describe('TimeEntryForm', () => {
  it('renders without crashing', () => {
    render(<TimeEntryForm testID="timeentryform" />)
    expect(screen.getByTestId('timeentryform')).toBeTruthy()
  })
})
