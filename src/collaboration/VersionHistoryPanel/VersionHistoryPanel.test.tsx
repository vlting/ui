import { render, screen } from '../../__test-utils__/render'
import { VersionHistoryPanel } from './VersionHistoryPanel'

describe('VersionHistoryPanel', () => {
  it('renders without crashing', () => {
    render(<VersionHistoryPanel testID="versionhistorypanel" />)
    expect(screen.getByTestId('versionhistorypanel')).toBeTruthy()
  })
})
