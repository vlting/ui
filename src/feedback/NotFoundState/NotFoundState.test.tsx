import { render, screen } from '../../__test-utils__/render'
import { NotFoundState } from './NotFoundState'

describe('NotFoundState', () => {
  it('renders without crashing', () => {
    render(<NotFoundState testID="notfoundstate" />)
    expect(screen.getByTestId('notfoundstate')).toBeTruthy()
  })
})
