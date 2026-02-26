import { render, screen } from '../../../src/__test-utils__/render'
import { Combobox } from './Combobox'

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

describe('Combobox', () => {
  it('renders with placeholder', () => {
    render(<Combobox.Root options={options} placeholder="Select fruit" />)
    expect(screen.getByText('Select fruit')).toBeTruthy()
  })

  it.skip('has role="combobox" on trigger', () => {
    // TODO: Tamagui may not render role in JSDOM
    render(<Combobox.Root options={options} placeholder="Select" />)
    expect(screen.getByRole('combobox')).toBeTruthy()
  })

  it('renders when disabled', () => {
    render(<Combobox.Root options={options} disabled placeholder="Disabled" />)
    expect(screen.getByText('Disabled')).toBeTruthy()
  })

  it('shows selected value', () => {
    render(<Combobox.Root options={options} value="apple" placeholder="Select" />)
    expect(screen.getByText('Apple')).toBeTruthy()
  })
})
