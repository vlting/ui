import { render, screen } from '../../__test-utils__/render'
import { Tabs } from './Tabs'

describe('Tabs', () => {
  it('renders without crashing', () => {
    render(<Tabs testID="tabs" />)
    expect(screen.getByTestId('tabs')).toBeTruthy()
  })
})
