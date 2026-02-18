import { render, screen } from '../../__test-utils__/render'
import { ActivityLogList } from './ActivityLogList'

describe('ActivityLogList', () => {
  it('renders without crashing', () => {
    render(<ActivityLogList testID="activityloglist" />)
    expect(screen.getByTestId('activityloglist')).toBeTruthy()
  })
})
