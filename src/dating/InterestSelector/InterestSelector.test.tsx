import { fireEvent, render, screen } from '../../__test-utils__/render'
import { InterestSelector } from './InterestSelector'

const mockInterests = [
  { id: 'hiking', label: 'Hiking' },
  { id: 'cooking', label: 'Cooking' },
  { id: 'music', label: 'Music' },
  { id: 'travel', label: 'Travel' },
  { id: 'reading', label: 'Reading' },
]

describe('InterestSelector', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <InterestSelector
          interests={mockInterests}
          value={[]}
          onChange={() => {}}
          testID="selector"
        />,
      )
      expect(screen.getByTestId('selector')).toBeTruthy()
    })

    it('renders all provided interest items', () => {
      render(
        <InterestSelector
          interests={mockInterests}
          value={[]}
          onChange={() => {}}
          testID="selector"
        />,
      )
      for (const interest of mockInterests) {
        expect(screen.getByText(interest.label)).toBeTruthy()
      }
    })

    it('renders selection count when maxSelections is set', () => {
      render(
        <InterestSelector
          interests={mockInterests}
          value={['hiking', 'cooking']}
          onChange={() => {}}
          maxSelections={3}
          testID="selector"
        />,
      )
      expect(screen.getByText('2/3 selected')).toBeTruthy()
    })

    it('does not render selection count when maxSelections is not set', () => {
      render(
        <InterestSelector
          interests={mockInterests}
          value={['hiking']}
          onChange={() => {}}
          testID="selector"
        />,
      )
      expect(screen.queryByText(/selected/)).toBeNull()
    })
  })

  describe('controlled state', () => {
    it('calls onChange with item added when unselected chip is pressed', () => {
      const onChange = jest.fn()
      render(
        <InterestSelector
          interests={mockInterests}
          value={['hiking']}
          onChange={onChange}
          testID="selector"
        />,
      )
      fireEvent.click(screen.getByText('Cooking'))
      expect(onChange).toHaveBeenCalledWith(['hiking', 'cooking'])
    })

    it('calls onChange with item removed when selected chip is pressed', () => {
      const onChange = jest.fn()
      render(
        <InterestSelector
          interests={mockInterests}
          value={['hiking', 'cooking']}
          onChange={onChange}
          testID="selector"
        />,
      )
      fireEvent.click(screen.getByText('Hiking'))
      expect(onChange).toHaveBeenCalledWith(['cooking'])
    })

    it('does not call onChange when at max and pressing unselected chip', () => {
      const onChange = jest.fn()
      render(
        <InterestSelector
          interests={mockInterests}
          value={['hiking', 'cooking']}
          onChange={onChange}
          maxSelections={2}
          testID="selector"
        />,
      )
      fireEvent.click(screen.getByText('Music'))
      expect(onChange).not.toHaveBeenCalled()
    })

    it('allows deselecting when at max selections', () => {
      const onChange = jest.fn()
      render(
        <InterestSelector
          interests={mockInterests}
          value={['hiking', 'cooking']}
          onChange={onChange}
          maxSelections={2}
          testID="selector"
        />,
      )
      fireEvent.click(screen.getByText('Hiking'))
      expect(onChange).toHaveBeenCalledWith(['cooking'])
    })
  })

  describe('accessibility', () => {
    it('has role="group" on the container', () => {
      render(
        <InterestSelector
          interests={mockInterests}
          value={[]}
          onChange={() => {}}
          testID="selector"
        />,
      )
      const el = screen.getByTestId('selector')
      expect(el.getAttribute?.('role')).toBe('group')
    })

    it('has aria-label "Select your interests" on the container', () => {
      render(
        <InterestSelector
          interests={mockInterests}
          value={[]}
          onChange={() => {}}
          testID="selector"
        />,
      )
      const el = screen.getByTestId('selector')
      expect(el.getAttribute?.('aria-label')).toBe('Select your interests')
    })

    it('each chip has role="checkbox"', () => {
      render(
        <InterestSelector
          interests={mockInterests}
          value={[]}
          onChange={() => {}}
          testID="selector"
        />,
      )
      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes.length).toBe(mockInterests.length)
    })

    it('selected chip has aria-checked="true"', () => {
      render(
        <InterestSelector
          interests={mockInterests}
          value={['hiking']}
          onChange={() => {}}
          testID="selector"
        />,
      )
      const hikingChip = screen.getByLabelText('Hiking')
      expect(hikingChip.getAttribute?.('aria-checked')).toBe('true')
    })

    it('unselected chip has aria-checked="false"', () => {
      render(
        <InterestSelector
          interests={mockInterests}
          value={['hiking']}
          onChange={() => {}}
          testID="selector"
        />,
      )
      const cookingChip = screen.getByLabelText('Cooking')
      expect(cookingChip.getAttribute?.('aria-checked')).toBe('false')
    })

    it('unselected chips get aria-disabled when at max selections', () => {
      render(
        <InterestSelector
          interests={[
            { id: 'a', label: 'Alpha' },
            { id: 'b', label: 'Beta' },
          ]}
          value={['a']}
          onChange={() => {}}
          maxSelections={1}
          testID="selector"
        />,
      )
      const betaChip = screen.getByLabelText('Beta')
      expect(betaChip.getAttribute?.('aria-disabled')).toBe('true')
    })
  })
})
