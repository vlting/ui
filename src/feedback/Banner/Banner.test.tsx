import { render, screen } from '../../__test-utils__/render'
import { Banner } from './Banner'

describe('Banner', () => {
  it('renders without crashing', () => {
    render(<Banner testID="banner" />)
    expect(screen.getByTestId('banner')).toBeTruthy()
  })
})
