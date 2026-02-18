import { render, screen } from '../../__test-utils__/render'
import { AccountSwitcher } from './AccountSwitcher'

describe('AccountSwitcher', () => {
  it('renders without crashing', () => {
    render(<AccountSwitcher testID="accountswitcher" />)
    expect(screen.getByTestId('accountswitcher')).toBeTruthy()
  })
})
