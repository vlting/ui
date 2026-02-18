import { render, screen } from '../../__test-utils__/render'
import { GanttChart } from './GanttChart'

describe('GanttChart', () => {
  it('renders without crashing', () => {
    render(<GanttChart testID="ganttchart" />)
    expect(screen.getByTestId('ganttchart')).toBeTruthy()
  })
})
