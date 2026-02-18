import { render, screen } from '../../__test-utils__/render'
import { PageHeader } from './PageHeader'

describe('PageHeader', () => {
  it('renders without crashing', () => {
    render(<PageHeader testID="pageheader" />)
    expect(screen.getByTestId('pageheader')).toBeTruthy()
  })
})
