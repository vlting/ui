import { render, screen } from '../../__test-utils__/render'
import { QuickAddPanel } from './QuickAddPanel'

describe('QuickAddPanel', () => {
  it('renders without crashing', () => {
    render(<QuickAddPanel testID="quickaddpanel" />)
    expect(screen.getByTestId('quickaddpanel')).toBeTruthy()
  })
})
