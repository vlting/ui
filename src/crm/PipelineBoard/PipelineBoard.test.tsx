import { render, screen } from '../../__test-utils__/render'
import { PipelineBoard } from './PipelineBoard'

describe('PipelineBoard', () => {
  it('renders without crashing', () => {
    render(<PipelineBoard testID="pipelineboard" />)
    expect(screen.getByTestId('pipelineboard')).toBeTruthy()
  })
})
