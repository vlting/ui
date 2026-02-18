import { render, screen } from '../../__test-utils__/render'
import { Combobox } from './Combobox'

describe('Combobox', () => {
  it('renders without crashing', () => {
    render(<Combobox testID="combobox" />)
    expect(screen.getByTestId('combobox')).toBeTruthy()
  })
})
