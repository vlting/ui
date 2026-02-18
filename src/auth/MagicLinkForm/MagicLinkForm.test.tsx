import { render, screen } from '../../__test-utils__/render'
import { MagicLinkForm } from './MagicLinkForm'

describe('MagicLinkForm', () => {
  it('renders without crashing', () => {
    render(<MagicLinkForm testID="magiclinkform" />)
    expect(screen.getByTestId('magiclinkform')).toBeTruthy()
  })
})
