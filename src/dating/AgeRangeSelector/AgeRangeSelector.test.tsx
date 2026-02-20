import { fireEvent, render, screen } from '../../__test-utils__/render'
import { AgeRangeSelector } from './AgeRangeSelector'

describe('AgeRangeSelector', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <AgeRangeSelector
          value={[21, 35]}
          onChange={() => {}}
          testID="age"
        />,
      )
      expect(screen.getByTestId('age')).toBeTruthy()
    })

    it('displays the current age range', () => {
      render(
        <AgeRangeSelector
          value={[21, 35]}
          onChange={() => {}}
          testID="age"
        />,
      )
      expect(screen.getByText('21 - 35')).toBeTruthy()
    })

    it('displays min and max labels', () => {
      render(
        <AgeRangeSelector
          value={[25, 45]}
          onChange={() => {}}
          min={18}
          max={99}
          testID="age"
        />,
      )
      expect(screen.getByText('18')).toBeTruthy()
      expect(screen.getByText('99')).toBeTruthy()
    })

    it('displays "Minimum age" and "Maximum age" labels', () => {
      render(
        <AgeRangeSelector
          value={[21, 35]}
          onChange={() => {}}
          testID="age"
        />,
      )
      expect(screen.getByText('Minimum age')).toBeTruthy()
      expect(screen.getByText('Maximum age')).toBeTruthy()
    })
  })

  describe('controlled state — minimum age', () => {
    it('calls onChange with decreased min when min decrement is pressed', () => {
      const onChange = jest.fn()
      render(
        <AgeRangeSelector
          value={[25, 35]}
          onChange={onChange}
          testID="age"
        />,
      )
      fireEvent.click(screen.getByTestId('age-min-decrement'))
      expect(onChange).toHaveBeenCalledWith([24, 35])
    })

    it('calls onChange with increased min when min increment is pressed', () => {
      const onChange = jest.fn()
      render(
        <AgeRangeSelector
          value={[25, 35]}
          onChange={onChange}
          testID="age"
        />,
      )
      fireEvent.click(screen.getByTestId('age-min-increment'))
      expect(onChange).toHaveBeenCalledWith([26, 35])
    })

    it('prevents min from going below absolute minimum', () => {
      const onChange = jest.fn()
      render(
        <AgeRangeSelector
          value={[18, 35]}
          onChange={onChange}
          min={18}
          testID="age"
        />,
      )
      fireEvent.click(screen.getByTestId('age-min-decrement'))
      expect(onChange).toHaveBeenCalledWith([18, 35])
    })

    it('prevents min from exceeding max', () => {
      const onChange = jest.fn()
      render(
        <AgeRangeSelector
          value={[35, 35]}
          onChange={onChange}
          testID="age"
        />,
      )
      fireEvent.click(screen.getByTestId('age-min-increment'))
      expect(onChange).toHaveBeenCalledWith([35, 35])
    })
  })

  describe('controlled state — maximum age', () => {
    it('calls onChange with decreased max when max decrement is pressed', () => {
      const onChange = jest.fn()
      render(
        <AgeRangeSelector
          value={[25, 35]}
          onChange={onChange}
          testID="age"
        />,
      )
      fireEvent.click(screen.getByTestId('age-max-decrement'))
      expect(onChange).toHaveBeenCalledWith([25, 34])
    })

    it('calls onChange with increased max when max increment is pressed', () => {
      const onChange = jest.fn()
      render(
        <AgeRangeSelector
          value={[25, 35]}
          onChange={onChange}
          testID="age"
        />,
      )
      fireEvent.click(screen.getByTestId('age-max-increment'))
      expect(onChange).toHaveBeenCalledWith([25, 36])
    })

    it('prevents max from going below min', () => {
      const onChange = jest.fn()
      render(
        <AgeRangeSelector
          value={[35, 35]}
          onChange={onChange}
          testID="age"
        />,
      )
      fireEvent.click(screen.getByTestId('age-max-decrement'))
      expect(onChange).toHaveBeenCalledWith([35, 35])
    })

    it('prevents max from exceeding absolute maximum', () => {
      const onChange = jest.fn()
      render(
        <AgeRangeSelector
          value={[25, 99]}
          onChange={onChange}
          max={99}
          testID="age"
        />,
      )
      fireEvent.click(screen.getByTestId('age-max-increment'))
      expect(onChange).toHaveBeenCalledWith([25, 99])
    })
  })

  describe('accessibility', () => {
    it('has two slider roles for min and max', () => {
      render(
        <AgeRangeSelector
          value={[25, 35]}
          onChange={() => {}}
          testID="age"
        />,
      )
      const sliders = screen.getAllByRole('slider')
      expect(sliders.length).toBe(2)
    })

    it('minimum slider has correct aria attributes', () => {
      render(
        <AgeRangeSelector
          value={[25, 35]}
          onChange={() => {}}
          min={18}
          testID="age"
        />,
      )
      const minSlider = screen.getByLabelText('Minimum age')
      expect(minSlider.getAttribute?.('aria-valuenow')).toBe('25')
      expect(minSlider.getAttribute?.('aria-valuemin')).toBe('18')
      expect(minSlider.getAttribute?.('aria-valuemax')).toBe('35')
      expect(minSlider.getAttribute?.('aria-valuetext')).toBe('25 years')
    })

    it('maximum slider has correct aria attributes', () => {
      render(
        <AgeRangeSelector
          value={[25, 35]}
          onChange={() => {}}
          max={99}
          testID="age"
        />,
      )
      const maxSlider = screen.getByLabelText('Maximum age')
      expect(maxSlider.getAttribute?.('aria-valuenow')).toBe('35')
      expect(maxSlider.getAttribute?.('aria-valuemin')).toBe('25')
      expect(maxSlider.getAttribute?.('aria-valuemax')).toBe('99')
      expect(maxSlider.getAttribute?.('aria-valuetext')).toBe('35 years')
    })

    it('both sliders have aria-disabled when disabled', () => {
      render(
        <AgeRangeSelector
          value={[25, 35]}
          onChange={() => {}}
          disabled
          testID="age"
        />,
      )
      const sliders = screen.getAllByRole('slider')
      for (const slider of sliders) {
        expect(slider.getAttribute?.('aria-disabled')).toBe('true')
      }
    })
  })

  describe('disabled state', () => {
    it('does not call onChange when disabled', () => {
      const onChange = jest.fn()
      render(
        <AgeRangeSelector
          value={[25, 35]}
          onChange={onChange}
          disabled
          testID="age"
        />,
      )
      fireEvent.click(screen.getByTestId('age-min-increment'))
      fireEvent.click(screen.getByTestId('age-max-decrement'))
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('step behavior', () => {
    it('increments by custom step', () => {
      const onChange = jest.fn()
      render(
        <AgeRangeSelector
          value={[20, 40]}
          onChange={onChange}
          step={5}
          testID="age"
        />,
      )
      fireEvent.click(screen.getByTestId('age-min-increment'))
      expect(onChange).toHaveBeenCalledWith([25, 40])
    })
  })
})
