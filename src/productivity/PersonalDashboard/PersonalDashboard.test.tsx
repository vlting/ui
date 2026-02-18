import { render, screen } from '../../__test-utils__/render'
import { PersonalDashboard } from './PersonalDashboard'

describe('PersonalDashboard', () => {
  it('renders without crashing', () => {
    render(<PersonalDashboard testID="personaldashboard" />)
    expect(screen.getByTestId('personaldashboard')).toBeTruthy()
  })
})
