import { render, screen } from '../../__test-utils__/render'
import { ApprovalWorkflowPanel } from './ApprovalWorkflowPanel'

describe('ApprovalWorkflowPanel', () => {
  it('renders without crashing', () => {
    render(<ApprovalWorkflowPanel testID="approvalworkflowpanel" />)
    expect(screen.getByTestId('approvalworkflowpanel')).toBeTruthy()
  })
})
