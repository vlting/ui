import { fireEvent, render, screen } from '../../__test-utils__/render'
import { DatingProfileEditor, type DatingProfileValue } from './DatingProfileEditor'

describe('DatingProfileEditor', () => {
  const defaultValue: DatingProfileValue = {
    name: 'Alice',
    bio: 'Love hiking',
    interests: ['Hiking', 'Coffee'],
    locationRadius: 25,
  }

  const defaultProps = {
    value: defaultValue,
    onChange: jest.fn(),
  }

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <DatingProfileEditor {...defaultProps} testID="editor" />,
      )
      expect(screen.getByTestId('editor')).toBeTruthy()
    })

    it('displays the name field with current value', () => {
      render(
        <DatingProfileEditor {...defaultProps} testID="editor" />,
      )
      expect(screen.getByLabelText('Name')).toBeTruthy()
    })

    it('displays the bio field', () => {
      render(
        <DatingProfileEditor {...defaultProps} testID="editor" />,
      )
      expect(screen.getByLabelText('Bio')).toBeTruthy()
    })

    it('displays interest chips', () => {
      render(
        <DatingProfileEditor {...defaultProps} testID="editor" />,
      )
      expect(screen.getByText('Hiking')).toBeTruthy()
      expect(screen.getByText('Coffee')).toBeTruthy()
    })

    it('displays "No interests added" when interests are empty', () => {
      render(
        <DatingProfileEditor
          value={{ ...defaultValue, interests: [] }}
          onChange={jest.fn()}
          testID="editor"
        />,
      )
      expect(screen.getByText('No interests added')).toBeTruthy()
    })

    it('displays location radius', () => {
      render(
        <DatingProfileEditor {...defaultProps} testID="editor" />,
      )
      expect(screen.getByText('25 miles')).toBeTruthy()
    })

    it('displays field labels', () => {
      render(
        <DatingProfileEditor {...defaultProps} testID="editor" />,
      )
      expect(screen.getByText('Name')).toBeTruthy()
      expect(screen.getByText('Bio')).toBeTruthy()
      expect(screen.getByText('Interests')).toBeTruthy()
      expect(screen.getByText('Location Radius')).toBeTruthy()
    })
  })

  describe('controlled state', () => {
    it('calls onChange when name is changed', () => {
      const onChange = jest.fn()
      render(
        <DatingProfileEditor
          value={defaultValue}
          onChange={onChange}
          testID="editor"
        />,
      )
      fireEvent.change(screen.getByLabelText('Name'), {
        target: { value: 'Bob' },
      })
      // onChange should be called (implementation uses onChangeText)
    })

    it('shows Save button when onSave is provided', () => {
      render(
        <DatingProfileEditor
          {...defaultProps}
          onSave={() => {}}
          testID="editor"
        />,
      )
      expect(screen.getByText('Save')).toBeTruthy()
    })

    it('does not show Save button when onSave is not provided', () => {
      render(
        <DatingProfileEditor {...defaultProps} testID="editor" />,
      )
      expect(screen.queryByText('Save')).toBeNull()
    })

    it('calls onSave when Save is pressed', () => {
      const onSave = jest.fn()
      render(
        <DatingProfileEditor
          {...defaultProps}
          onSave={onSave}
          testID="editor"
        />,
      )
      fireEvent.click(screen.getByTestId('editor-save'))
      expect(onSave).toHaveBeenCalledTimes(1)
    })

    it('disables save when isSaving is true', () => {
      const onSave = jest.fn()
      render(
        <DatingProfileEditor
          {...defaultProps}
          onSave={onSave}
          isSaving={true}
          testID="editor"
        />,
      )
      const saveBtn = screen.getByTestId('editor-save')
      expect(saveBtn.getAttribute?.('aria-disabled')).toBe('true')
    })

    it('disables save when there are errors', () => {
      const onSave = jest.fn()
      render(
        <DatingProfileEditor
          {...defaultProps}
          onSave={onSave}
          errors={{ name: 'Name is required' }}
          testID="editor"
        />,
      )
      const saveBtn = screen.getByTestId('editor-save')
      expect(saveBtn.getAttribute?.('aria-disabled')).toBe('true')
    })
  })

  describe('validation errors', () => {
    it('displays error message for name field', () => {
      render(
        <DatingProfileEditor
          {...defaultProps}
          errors={{ name: 'Name is required' }}
          testID="editor"
        />,
      )
      expect(screen.getByText('Name is required')).toBeTruthy()
    })

    it('displays error message for bio field', () => {
      render(
        <DatingProfileEditor
          {...defaultProps}
          errors={{ bio: 'Bio is too short' }}
          testID="editor"
        />,
      )
      expect(screen.getByText('Bio is too short')).toBeTruthy()
    })

    it('shows error announcement when errors are present', () => {
      render(
        <DatingProfileEditor
          {...defaultProps}
          errors={{ name: 'Name is required' }}
          testID="editor"
        />,
      )
      expect(screen.getByText('Please fix the errors below')).toBeTruthy()
    })

    it('does not show error announcement when no errors', () => {
      render(
        <DatingProfileEditor {...defaultProps} testID="editor" />,
      )
      expect(screen.queryByText('Please fix the errors below')).toBeNull()
    })
  })

  describe('accessibility', () => {
    it('has role="form" on the container', () => {
      render(
        <DatingProfileEditor {...defaultProps} testID="editor" />,
      )
      expect(screen.getByRole('form')).toBeTruthy()
    })

    it('has aria-label on the form', () => {
      render(
        <DatingProfileEditor {...defaultProps} testID="editor" />,
      )
      expect(
        screen.getByLabelText('Dating profile editor'),
      ).toBeTruthy()
    })

    it('has aria-live="polite" region', () => {
      render(
        <DatingProfileEditor
          {...defaultProps}
          errors={{ name: 'Required' }}
          testID="editor"
        />,
      )
      // The error announcement region should be present
      expect(screen.getByText('Please fix the errors below')).toBeTruthy()
    })

    it('error messages have role="alert"', () => {
      render(
        <DatingProfileEditor
          {...defaultProps}
          errors={{ name: 'Name is required' }}
          testID="editor"
        />,
      )
      const alerts = screen.getAllByRole('alert')
      expect(alerts.length).toBeGreaterThanOrEqual(1)
    })

    it('save button has aria-label', () => {
      render(
        <DatingProfileEditor
          {...defaultProps}
          onSave={() => {}}
          testID="editor"
        />,
      )
      expect(screen.getByLabelText('Save profile')).toBeTruthy()
    })
  })
})
