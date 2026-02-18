import { render, screen } from '../../__test-utils__/render'
import { AuthProfileEditor } from './AuthProfileEditor'

describe('AuthProfileEditor', () => {
  it('renders without crashing', () => {
    render(<AuthProfileEditor testID="authprofileeditor" />)
    expect(screen.getByTestId('authprofileeditor')).toBeTruthy()
  })
})
