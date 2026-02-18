import { render, screen } from '../../__test-utils__/render'
import { ShareModal } from './ShareModal'

describe('ShareModal', () => {
  it('renders without crashing', () => {
    render(<ShareModal testID="sharemodal" />)
    expect(screen.getByTestId('sharemodal')).toBeTruthy()
  })
})
