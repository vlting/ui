import { render, screen } from '../../__test-utils__/render'
import { Dialog } from './Dialog'

describe('Dialog', () => {
  it('renders without crashing', () => {
    render(<Dialog testID="dialog" />)
    expect(screen.getByTestId('dialog')).toBeTruthy()
  })
})
