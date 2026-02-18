import { render, screen } from '../../__test-utils__/render'
import { MonetizedContentLock } from './MonetizedContentLock'

describe('MonetizedContentLock', () => {
  it('renders without crashing', () => {
    render(<MonetizedContentLock testID="monetizedcontentlock" />)
    expect(screen.getByTestId('monetizedcontentlock')).toBeTruthy()
  })
})
