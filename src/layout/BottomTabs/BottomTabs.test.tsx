import { render, screen } from '../../__test-utils__/render'
import { BottomTabs } from './BottomTabs'

describe('BottomTabs', () => {
  it('renders without crashing', () => {
    render(<BottomTabs testID="bottomtabs" />)
    expect(screen.getByTestId('bottomtabs')).toBeTruthy()
  })
})
