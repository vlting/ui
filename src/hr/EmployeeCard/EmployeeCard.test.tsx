import { render, screen } from '../../__test-utils__/render'
import { EmployeeCard } from './EmployeeCard'

describe('EmployeeCard', () => {
  it('renders without crashing', () => {
    render(<EmployeeCard testID="employeecard" />)
    expect(screen.getByTestId('employeecard')).toBeTruthy()
  })
})
