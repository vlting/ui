import { fireEvent, render, screen } from '../../__test-utils__/render'
import { LocationRadiusSelector } from './LocationRadiusSelector'

describe('LocationRadiusSelector', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <LocationRadiusSelector
          value={25}
          onChange={() => {}}
          testID="radius"
        />,
      )
      expect(screen.getByTestId('radius')).toBeTruthy()
    })

    it('displays the current value with unit', () => {
      render(
        <LocationRadiusSelector
          value={25}
          onChange={() => {}}
          unit="km"
          testID="radius"
        />,
      )
      expect(screen.getByText('25 km')).toBeTruthy()
    })

    it('displays miles unit when specified', () => {
      render(
        <LocationRadiusSelector
          value={15}
          onChange={() => {}}
          unit="mi"
          testID="radius"
        />,
      )
      expect(screen.getByText('15 mi')).toBeTruthy()
    })

    it('displays min and max boundary labels', () => {
      render(
        <LocationRadiusSelector
          value={50}
          onChange={() => {}}
          min={5}
          max={200}
          unit="km"
          testID="radius"
        />,
      )
      expect(screen.getByText('5 km')).toBeTruthy()
      expect(screen.getByText('200 km')).toBeTruthy()
    })

    it('renders unit toggle button when onUnitChange is provided', () => {
      render(
        <LocationRadiusSelector
          value={25}
          onChange={() => {}}
          unit="km"
          onUnitChange={() => {}}
          testID="radius"
        />,
      )
      // Shows the opposite unit on the toggle button
      expect(screen.getByText('mi')).toBeTruthy()
    })

    it('does not render unit toggle when onUnitChange is not provided', () => {
      render(
        <LocationRadiusSelector
          value={25}
          onChange={() => {}}
          unit="km"
          testID="radius"
        />,
      )
      expect(screen.queryByText('mi')).toBeNull()
    })
  })

  describe('controlled state', () => {
    it('calls onChange with decremented value when minus is pressed', () => {
      const onChange = jest.fn()
      render(
        <LocationRadiusSelector
          value={25}
          onChange={onChange}
          step={5}
          testID="radius"
        />,
      )
      fireEvent.click(screen.getByTestId('radius-decrement'))
      expect(onChange).toHaveBeenCalledWith(20)
    })

    it('calls onChange with incremented value when plus is pressed', () => {
      const onChange = jest.fn()
      render(
        <LocationRadiusSelector
          value={25}
          onChange={onChange}
          step={5}
          testID="radius"
        />,
      )
      fireEvent.click(screen.getByTestId('radius-increment'))
      expect(onChange).toHaveBeenCalledWith(30)
    })

    it('clamps value to min', () => {
      const onChange = jest.fn()
      render(
        <LocationRadiusSelector
          value={1}
          onChange={onChange}
          min={1}
          step={5}
          testID="radius"
        />,
      )
      fireEvent.click(screen.getByTestId('radius-decrement'))
      expect(onChange).toHaveBeenCalledWith(1)
    })

    it('clamps value to max', () => {
      const onChange = jest.fn()
      render(
        <LocationRadiusSelector
          value={100}
          onChange={onChange}
          max={100}
          step={5}
          testID="radius"
        />,
      )
      fireEvent.click(screen.getByTestId('radius-increment'))
      expect(onChange).toHaveBeenCalledWith(100)
    })

    it('calls onUnitChange when unit toggle is pressed', () => {
      const onUnitChange = jest.fn()
      render(
        <LocationRadiusSelector
          value={25}
          onChange={() => {}}
          unit="km"
          onUnitChange={onUnitChange}
          testID="radius"
        />,
      )
      fireEvent.click(screen.getByLabelText('Switch to miles'))
      expect(onUnitChange).toHaveBeenCalledWith('mi')
    })

    it('calls onUnitChange toggling from mi to km', () => {
      const onUnitChange = jest.fn()
      render(
        <LocationRadiusSelector
          value={25}
          onChange={() => {}}
          unit="mi"
          onUnitChange={onUnitChange}
          testID="radius"
        />,
      )
      fireEvent.click(screen.getByLabelText('Switch to kilometers'))
      expect(onUnitChange).toHaveBeenCalledWith('km')
    })
  })

  describe('accessibility', () => {
    it('has role="slider" on the track', () => {
      render(
        <LocationRadiusSelector
          value={25}
          onChange={() => {}}
          testID="radius"
        />,
      )
      const slider = screen.getByRole('slider')
      expect(slider).toBeTruthy()
    })

    it('has correct aria-valuenow', () => {
      render(
        <LocationRadiusSelector
          value={42}
          onChange={() => {}}
          testID="radius"
        />,
      )
      const slider = screen.getByRole('slider')
      expect(slider.getAttribute?.('aria-valuenow')).toBe('42')
    })

    it('has correct aria-valuemin and aria-valuemax', () => {
      render(
        <LocationRadiusSelector
          value={25}
          onChange={() => {}}
          min={5}
          max={200}
          testID="radius"
        />,
      )
      const slider = screen.getByRole('slider')
      expect(slider.getAttribute?.('aria-valuemin')).toBe('5')
      expect(slider.getAttribute?.('aria-valuemax')).toBe('200')
    })

    it('has correct aria-valuetext', () => {
      render(
        <LocationRadiusSelector
          value={25}
          onChange={() => {}}
          unit="km"
          testID="radius"
        />,
      )
      const slider = screen.getByRole('slider')
      expect(slider.getAttribute?.('aria-valuetext')).toBe('25 kilometers')
    })

    it('has correct aria-valuetext for miles', () => {
      render(
        <LocationRadiusSelector
          value={15}
          onChange={() => {}}
          unit="mi"
          testID="radius"
        />,
      )
      const slider = screen.getByRole('slider')
      expect(slider.getAttribute?.('aria-valuetext')).toBe('15 miles')
    })

    it('has aria-disabled on slider when disabled', () => {
      render(
        <LocationRadiusSelector
          value={25}
          onChange={() => {}}
          disabled
          testID="radius"
        />,
      )
      const slider = screen.getByRole('slider')
      expect(slider.getAttribute?.('aria-disabled')).toBe('true')
    })
  })

  describe('disabled state', () => {
    it('does not call onChange when disabled', () => {
      const onChange = jest.fn()
      render(
        <LocationRadiusSelector
          value={25}
          onChange={onChange}
          disabled
          testID="radius"
        />,
      )
      fireEvent.click(screen.getByTestId('radius-increment'))
      expect(onChange).not.toHaveBeenCalled()
    })
  })
})
