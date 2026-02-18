import { render, screen } from '../../__test-utils__/render'
import { WorkflowBuilderCanvas } from './WorkflowBuilderCanvas'

describe('WorkflowBuilderCanvas', () => {
  it('renders without crashing', () => {
    render(<WorkflowBuilderCanvas testID="workflowbuildercanvas" />)
    expect(screen.getByTestId('workflowbuildercanvas')).toBeTruthy()
  })
})
