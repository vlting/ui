import { render, screen } from '../../__test-utils__/render'
import { ReadReceipt } from './ReadReceipt'

describe('ReadReceipt', () => {
  it('renders without crashing', () => {
    render(<ReadReceipt testID="readreceipt" />)
    expect(screen.getByTestId('readreceipt')).toBeTruthy()
  })
})
