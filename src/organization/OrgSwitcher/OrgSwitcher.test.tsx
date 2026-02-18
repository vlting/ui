import { render, screen } from '../../__test-utils__/render'
import { OrgSwitcher } from './OrgSwitcher'

describe('OrgSwitcher', () => {
  it('renders without crashing', () => {
    render(<OrgSwitcher testID="orgswitcher" />)
    expect(screen.getByTestId('orgswitcher')).toBeTruthy()
  })
})
