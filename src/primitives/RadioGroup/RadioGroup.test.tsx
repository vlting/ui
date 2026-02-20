import { fireEvent, render, screen } from '../../__test-utils__/render'
import { RadioGroup } from './RadioGroup'

describe('RadioGroup', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<RadioGroup testID="radiogroup" />)
      expect(screen.getByTestId('radiogroup')).toBeTruthy()
    })

    it('renders options with labels', () => {
      render(
        <RadioGroup>
          <RadioGroup.ItemRow>
            <RadioGroup.Item testID="item-1" value="a" />
            <RadioGroup.ItemLabel>Option A</RadioGroup.ItemLabel>
          </RadioGroup.ItemRow>
          <RadioGroup.ItemRow>
            <RadioGroup.Item testID="item-2" value="b" />
            <RadioGroup.ItemLabel>Option B</RadioGroup.ItemLabel>
          </RadioGroup.ItemRow>
        </RadioGroup>,
      )
      expect(screen.getByText('Option A')).toBeTruthy()
      expect(screen.getByText('Option B')).toBeTruthy()
    })
  })

  describe('compound sub-components', () => {
    it('renders RadioGroup.Container', () => {
      render(
        <RadioGroup.Container testID="container">
          <RadioGroup.GroupLabel>Choose a plan</RadioGroup.GroupLabel>
        </RadioGroup.Container>,
      )
      expect(screen.getByTestId('container')).toBeTruthy()
      expect(screen.getByText('Choose a plan')).toBeTruthy()
    })

    it('renders RadioGroup.Error', () => {
      render(<RadioGroup.Error testID="error">Please select an option.</RadioGroup.Error>)
      expect(screen.getByTestId('error')).toBeTruthy()
    })

    it('renders RadioGroup.ItemDescription', () => {
      render(
        <RadioGroup.ItemLabelGroup>
          <RadioGroup.ItemLabel>Annual</RadioGroup.ItemLabel>
          <RadioGroup.ItemDescription>Save 20% vs monthly</RadioGroup.ItemDescription>
        </RadioGroup.ItemLabelGroup>,
      )
      expect(screen.getByText('Save 20% vs monthly')).toBeTruthy()
    })
  })

  describe('selection', () => {
    it('calls onValueChange when an option is selected', () => {
      const onValueChange = jest.fn()
      render(
        <RadioGroup onValueChange={onValueChange}>
          <RadioGroup.Item testID="item-a" value="a" />
          <RadioGroup.Item testID="item-b" value="b" />
        </RadioGroup>,
      )
      fireEvent.press(screen.getByTestId('item-a'))
      expect(onValueChange).toHaveBeenCalledWith('a')
    })
  })

  describe('controlled mode', () => {
    it('reflects the value prop', () => {
      render(
        <RadioGroup value="b">
          <RadioGroup.Item testID="item-a" value="a" />
          <RadioGroup.Item testID="item-b" value="b" />
        </RadioGroup>,
      )
      expect(screen.getByTestId('item-b')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('has radiogroup role', () => {
      render(<RadioGroup testID="rg" aria-label="Payment frequency" />)
      const el = screen.getByTestId('rg')
      expect(el.getAttribute?.('role')).toBe('radiogroup')
    })

    it('each item has radio role', () => {
      render(
        <RadioGroup>
          <RadioGroup.Item testID="item-a" value="a" />
        </RadioGroup>,
      )
      const item = screen.getByTestId('item-a')
      expect(item.getAttribute?.('role')).toBe('radio')
    })
  })
})
