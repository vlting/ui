import { fireEvent, render, screen } from '../../__test-utils__/render'
import { PreferenceEditor, type PreferenceValue } from './PreferenceEditor'

describe('PreferenceEditor', () => {
  const defaultValue: PreferenceValue = {
    ageRange: [22, 35],
    interests: ['Music', 'Travel'],
    locationRadius: 30,
    dealBreakers: ['Smoking'],
  }

  const defaultProps = {
    value: defaultValue,
    onChange: jest.fn(),
  }

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <PreferenceEditor {...defaultProps} testID="prefs" />,
      )
      expect(screen.getByTestId('prefs')).toBeTruthy()
    })

    it('displays the age range', () => {
      render(
        <PreferenceEditor {...defaultProps} testID="prefs" />,
      )
      expect(screen.getByText('22 - 35')).toBeTruthy()
    })

    it('displays the age range label', () => {
      render(
        <PreferenceEditor {...defaultProps} testID="prefs" />,
      )
      expect(screen.getByText('Age Range')).toBeTruthy()
    })

    it('displays interest chips', () => {
      render(
        <PreferenceEditor {...defaultProps} testID="prefs" />,
      )
      expect(screen.getByText('Music')).toBeTruthy()
      expect(screen.getByText('Travel')).toBeTruthy()
    })

    it('displays "No interests selected" when empty', () => {
      render(
        <PreferenceEditor
          value={{ ...defaultValue, interests: [] }}
          onChange={jest.fn()}
          testID="prefs"
        />,
      )
      expect(screen.getByText('No interests selected')).toBeTruthy()
    })

    it('displays location radius', () => {
      render(
        <PreferenceEditor {...defaultProps} testID="prefs" />,
      )
      expect(screen.getByText('30 miles')).toBeTruthy()
    })

    it('displays deal breaker chips', () => {
      render(
        <PreferenceEditor {...defaultProps} testID="prefs" />,
      )
      expect(screen.getByText('Smoking')).toBeTruthy()
    })

    it('displays "No deal breakers set" when empty', () => {
      render(
        <PreferenceEditor
          value={{ ...defaultValue, dealBreakers: [] }}
          onChange={jest.fn()}
          testID="prefs"
        />,
      )
      expect(screen.getByText('No deal breakers set')).toBeTruthy()
    })

    it('displays all section labels', () => {
      render(
        <PreferenceEditor {...defaultProps} testID="prefs" />,
      )
      expect(screen.getByText('Age Range')).toBeTruthy()
      expect(screen.getByText('Interests')).toBeTruthy()
      expect(screen.getByText('Location Radius')).toBeTruthy()
      expect(screen.getByText('Deal Breakers')).toBeTruthy()
    })
  })

  describe('save behavior', () => {
    it('shows Save button when onSave is provided', () => {
      render(
        <PreferenceEditor
          {...defaultProps}
          onSave={() => {}}
          testID="prefs"
        />,
      )
      expect(screen.getByText('Save')).toBeTruthy()
    })

    it('does not show Save button when onSave is not provided', () => {
      render(
        <PreferenceEditor {...defaultProps} testID="prefs" />,
      )
      expect(screen.queryByText('Save')).toBeNull()
    })

    it('calls onSave when Save is pressed', () => {
      const onSave = jest.fn()
      render(
        <PreferenceEditor
          {...defaultProps}
          onSave={onSave}
          testID="prefs"
        />,
      )
      fireEvent.click(screen.getByTestId('prefs-save'))
      expect(onSave).toHaveBeenCalledTimes(1)
    })

    it('disables save when isSaving is true', () => {
      const onSave = jest.fn()
      render(
        <PreferenceEditor
          {...defaultProps}
          onSave={onSave}
          isSaving={true}
          testID="prefs"
        />,
      )
      const saveBtn = screen.getByTestId('prefs-save')
      expect(saveBtn.getAttribute?.('aria-disabled')).toBe('true')
    })

    it('does not call onSave when isSaving is true', () => {
      const onSave = jest.fn()
      render(
        <PreferenceEditor
          {...defaultProps}
          onSave={onSave}
          isSaving={true}
          testID="prefs"
        />,
      )
      fireEvent.click(screen.getByTestId('prefs-save'))
      expect(onSave).not.toHaveBeenCalled()
    })
  })

  describe('accessibility', () => {
    it('has role="form" on the container', () => {
      render(
        <PreferenceEditor {...defaultProps} testID="prefs" />,
      )
      expect(screen.getByRole('form')).toBeTruthy()
    })

    it('has aria-label "Preference editor"', () => {
      render(
        <PreferenceEditor {...defaultProps} testID="prefs" />,
      )
      expect(
        screen.getByLabelText('Preference editor'),
      ).toBeTruthy()
    })

    it('interest chips have role="list"', () => {
      render(
        <PreferenceEditor {...defaultProps} testID="prefs" />,
      )
      const lists = screen.getAllByRole('list')
      expect(lists.length).toBeGreaterThanOrEqual(1)
    })

    it('save button has aria-label', () => {
      render(
        <PreferenceEditor
          {...defaultProps}
          onSave={() => {}}
          testID="prefs"
        />,
      )
      expect(screen.getByLabelText('Save preferences')).toBeTruthy()
    })
  })

  describe('compound sub-components', () => {
    it('exposes AgeRange sub-component', () => {
      expect(PreferenceEditor.AgeRange).toBeDefined()
    })

    it('exposes Interests sub-component', () => {
      expect(PreferenceEditor.Interests).toBeDefined()
    })

    it('exposes Location sub-component', () => {
      expect(PreferenceEditor.Location).toBeDefined()
    })

    it('exposes DealBreakers sub-component', () => {
      expect(PreferenceEditor.DealBreakers).toBeDefined()
    })
  })
})
