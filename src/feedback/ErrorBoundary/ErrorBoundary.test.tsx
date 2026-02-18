import { render, screen } from '../../__test-utils__/render'
import { ErrorBoundary } from './ErrorBoundary'

describe('ErrorBoundary', () => {
  it('renders without crashing', () => {
    render(<ErrorBoundary testID="errorboundary" />)
    expect(screen.getByTestId('errorboundary')).toBeTruthy()
  })
})
