import { fireEvent, render, screen } from '../../__test-utils__/render'
import { DealBreakerSelector } from './DealBreakerSelector'

const mockOptions = [
  { id: 'smoking', label: 'Smoking' },
  { id: 'drinking', label: 'Heavy Drinking' },
  { id: 'pets', label: 'No Pets' },
  { id: 'kids', label: 'Has Kids' },
]

const mockCategorizedOptions = [
  { id: 'smoking', label: 'Smoking', category: 'Lifestyle' },
  { id: 'drinking', label: 'Heavy Drinking', category: 'Lifestyle' },
  { id: 'distance', label: 'Long Distance', category: 'Logistics' },
  { id: 'schedule', label: 'Night Shift', category: 'Logistics' },
]

describe('DealBreakerSelector', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <DealBreakerSelector
          options={mockOptions}
          value={[]}
          onChange={() => {}}
          testID="dealbreaker"
        />,
      )
      expect(screen.getByTestId('dealbreaker')).toBeTruthy()
    })

    it('renders all option labels', () => {
      render(
        <DealBreakerSelector
          options={mockOptions}
          value={[]}
          onChange={() => {}}
          testID="dealbreaker"
        />,
      )
      for (const option of mockOptions) {
        expect(screen.getByText(option.label)).toBeTruthy()
      }
    })

    it('renders category headers when options have categories', () => {
      render(
        <DealBreakerSelector
          options={mockCategorizedOptions}
          value={[]}
          onChange={() => {}}
          testID="dealbreaker"
        />,
      )
      expect(screen.getByText('Lifestyle')).toBeTruthy()
      expect(screen.getByText('Logistics')).toBeTruthy()
    })

    it('does not render category headers when options have no categories', () => {
      render(
        <DealBreakerSelector
          options={mockOptions}
          value={[]}
          onChange={() => {}}
          testID="dealbreaker"
        />,
      )
      expect(screen.queryByText('Lifestyle')).toBeNull()
    })
  })

  describe('controlled state', () => {
    it('calls onChange with item added when unselected option is pressed', () => {
      const onChange = jest.fn()
      render(
        <DealBreakerSelector
          options={mockOptions}
          value={['smoking']}
          onChange={onChange}
          testID="dealbreaker"
        />,
      )
      fireEvent.click(screen.getByText('Heavy Drinking'))
      expect(onChange).toHaveBeenCalledWith(['smoking', 'drinking'])
    })

    it('calls onChange with item removed when selected option is pressed', () => {
      const onChange = jest.fn()
      render(
        <DealBreakerSelector
          options={mockOptions}
          value={['smoking', 'drinking']}
          onChange={onChange}
          testID="dealbreaker"
        />,
      )
      fireEvent.click(screen.getByText('Smoking'))
      expect(onChange).toHaveBeenCalledWith(['drinking'])
    })

    it('calls onChange with all items when multiple are toggled', () => {
      const onChange = jest.fn()
      render(
        <DealBreakerSelector
          options={mockOptions}
          value={[]}
          onChange={onChange}
          testID="dealbreaker"
        />,
      )
      fireEvent.click(screen.getByText('Smoking'))
      expect(onChange).toHaveBeenCalledWith(['smoking'])
    })
  })

  describe('accessibility', () => {
    it('has role="group" on the container', () => {
      render(
        <DealBreakerSelector
          options={mockOptions}
          value={[]}
          onChange={() => {}}
          testID="dealbreaker"
        />,
      )
      const el = screen.getByTestId('dealbreaker')
      expect(el.getAttribute?.('role')).toBe('group')
    })

    it('has aria-label "Deal-breakers" on the container', () => {
      render(
        <DealBreakerSelector
          options={mockOptions}
          value={[]}
          onChange={() => {}}
          testID="dealbreaker"
        />,
      )
      const el = screen.getByTestId('dealbreaker')
      expect(el.getAttribute?.('aria-label')).toBe('Deal-breakers')
    })

    it('each option has role="checkbox"', () => {
      render(
        <DealBreakerSelector
          options={mockOptions}
          value={[]}
          onChange={() => {}}
          testID="dealbreaker"
        />,
      )
      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes.length).toBe(mockOptions.length)
    })

    it('selected option has aria-checked="true"', () => {
      render(
        <DealBreakerSelector
          options={mockOptions}
          value={['smoking']}
          onChange={() => {}}
          testID="dealbreaker"
        />,
      )
      const smokingOption = screen.getByLabelText('Smoking')
      expect(smokingOption.getAttribute?.('aria-checked')).toBe('true')
    })

    it('unselected option has aria-checked="false"', () => {
      render(
        <DealBreakerSelector
          options={mockOptions}
          value={['smoking']}
          onChange={() => {}}
          testID="dealbreaker"
        />,
      )
      const drinkingOption = screen.getByLabelText('Heavy Drinking')
      expect(drinkingOption.getAttribute?.('aria-checked')).toBe('false')
    })
  })
})
