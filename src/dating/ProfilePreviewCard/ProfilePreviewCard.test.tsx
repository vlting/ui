import { render, screen } from '../../__test-utils__/render'
import { ProfilePreviewCard } from './ProfilePreviewCard'

describe('ProfilePreviewCard', () => {
  it('renders without crashing', () => {
    render(<ProfilePreviewCard testID="profilepreviewcard" />)
    expect(screen.getByTestId('profilepreviewcard')).toBeTruthy()
  })
})
