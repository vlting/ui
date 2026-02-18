import { render, screen } from '../../__test-utils__/render'
import { AuditLogViewer } from './AuditLogViewer'

describe('AuditLogViewer', () => {
  it('renders without crashing', () => {
    render(<AuditLogViewer testID="auditlogviewer" />)
    expect(screen.getByTestId('auditlogviewer')).toBeTruthy()
  })
})
