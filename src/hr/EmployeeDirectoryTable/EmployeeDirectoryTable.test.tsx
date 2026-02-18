import { render, screen } from '../../__test-utils__/render'
import { EmployeeDirectoryTable } from './EmployeeDirectoryTable'

describe('EmployeeDirectoryTable', () => {
  it('renders without crashing', () => {
    render(<EmployeeDirectoryTable testID="employeedirectorytable" />)
    expect(screen.getByTestId('employeedirectorytable')).toBeTruthy()
  })
})
