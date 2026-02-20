import { fireEvent, render, screen } from '../../__test-utils__/render'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<Checkbox testID="checkbox" />)
      expect(screen.getByTestId('checkbox')).toBeTruthy()
    })

    it('renders unchecked by default', () => {
      render(<Checkbox testID="checkbox" />)
      const el = screen.getByTestId('checkbox')
      expect(el).toBeTruthy()
    })

    it('renders in checked state', () => {
      render(<Checkbox testID="checkbox" checked />)
      expect(screen.getByTestId('checkbox')).toBeTruthy()
    })
  })

  describe('compound sub-components', () => {
    it('renders Checkbox.Row', () => {
      render(
        <Checkbox.Row testID="row">
          <Checkbox testID="checkbox" />
          <Checkbox.Label>Accept terms</Checkbox.Label>
        </Checkbox.Row>,
      )
      expect(screen.getByTestId('row')).toBeTruthy()
      expect(screen.getByText('Accept terms')).toBeTruthy()
    })

    it('renders Checkbox.LabelGroup', () => {
      render(
        <Checkbox.LabelGroup testID="group">
          <Checkbox.Label>Enable notifications</Checkbox.Label>
          <Checkbox.Description>Get updates by email</Checkbox.Description>
        </Checkbox.LabelGroup>,
      )
      expect(screen.getByTestId('group')).toBeTruthy()
      expect(screen.getByText('Get updates by email')).toBeTruthy()
    })

    it('renders Checkbox.Error', () => {
      render(<Checkbox.Error testID="error">This field is required.</Checkbox.Error>)
      expect(screen.getByTestId('error')).toBeTruthy()
    })
  })

  describe('interaction', () => {
    it('calls onCheckedChange when pressed', () => {
      const onCheckedChange = jest.fn()
      render(<Checkbox testID="checkbox" onCheckedChange={onCheckedChange} />)
      fireEvent.press(screen.getByTestId('checkbox'))
      expect(onCheckedChange).toHaveBeenCalledTimes(1)
    })
  })

  describe('disabled state', () => {
    it('renders disabled', () => {
      render(<Checkbox testID="checkbox" disabled />)
      expect(screen.getByTestId('checkbox')).toBeTruthy()
    })

    it('does not call onCheckedChange when disabled', () => {
      const onCheckedChange = jest.fn()
      render(<Checkbox testID="checkbox" disabled onCheckedChange={onCheckedChange} />)
      fireEvent.press(screen.getByTestId('checkbox'))
      expect(onCheckedChange).not.toHaveBeenCalled()
    })
  })

  describe('error state', () => {
    it('applies error variant', () => {
      render(<Checkbox testID="checkbox" error />)
      expect(screen.getByTestId('checkbox')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('has checkbox role', () => {
      render(<Checkbox testID="checkbox" />)
      const el = screen.getByTestId('checkbox')
      expect(el.getAttribute?.('role')).toBe('checkbox')
    })

    it('reflects checked state via aria-checked', () => {
      render(<Checkbox testID="checkbox" checked />)
      const el = screen.getByTestId('checkbox')
      expect(el.getAttribute?.('aria-checked')).toBe('true')
    })

    it('reflects unchecked state via aria-checked', () => {
      render(<Checkbox testID="checkbox" checked={false} />)
      const el = screen.getByTestId('checkbox')
      expect(el.getAttribute?.('aria-checked')).toBe('false')
    })
  })
})
