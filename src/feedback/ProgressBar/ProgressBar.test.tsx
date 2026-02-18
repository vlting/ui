import { render, screen } from '../../__test-utils__/render'
import { ProgressBar } from './ProgressBar'

describe('ProgressBar', () => {
  it('renders without crashing', () => {
    render(<ProgressBar testID="progressbar" />)
    expect(screen.getByTestId('progressbar')).toBeTruthy()
  })
})
