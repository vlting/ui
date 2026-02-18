import { render, screen } from '../../__test-utils__/render'
import { AppShell } from './AppShell'

describe('AppShell', () => {
  it('renders without crashing', () => {
    render(<AppShell testID="appshell" />)
    expect(screen.getByTestId('appshell')).toBeTruthy()
  })
})
