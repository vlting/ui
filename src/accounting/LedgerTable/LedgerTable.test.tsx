import { render, screen } from '../../__test-utils__/render'
import { LedgerTable } from './LedgerTable'

describe('LedgerTable', () => {
  it('renders without crashing', () => {
    render(<LedgerTable testID="ledgertable" />)
    expect(screen.getByTestId('ledgertable')).toBeTruthy()
  })
})
