import { render, screen } from '../../__test-utils__/render'
import { AutomationStatusBadge } from './AutomationStatusBadge'

describe('AutomationStatusBadge', () => {
  it('renders without crashing', () => {
    render(<AutomationStatusBadge testID="automationstatusbadge" />)
    expect(screen.getByTestId('automationstatusbadge')).toBeTruthy()
  })
})
