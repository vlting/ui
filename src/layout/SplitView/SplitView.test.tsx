import { render, screen } from '../../__test-utils__/render'
import { SplitView } from './SplitView'

describe('SplitView', () => {
  it('renders without crashing', () => {
    render(<SplitView testID="splitview" />)
    expect(screen.getByTestId('splitview')).toBeTruthy()
  })
})
